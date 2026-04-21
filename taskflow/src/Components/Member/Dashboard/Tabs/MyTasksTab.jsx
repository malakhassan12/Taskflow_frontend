import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

import TaskColumn from "../TaskBoard/TaskColumn";

import TaskDetailsModal from "../TaskBoard/TaskDetailsModal";

import { useNotifications } from "../../../../Context/NotificationsProvider";

import axios from "axios";

import { message } from "antd";



const STATUS_OVERRIDES_KEY = "taskflow_task_status_overrides";



const loadStatusOverrides = () => {

  try {

    const raw = sessionStorage.getItem(STATUS_OVERRIDES_KEY);

    if (!raw) {

      return {};

    }

    const parsed = JSON.parse(raw);

    return parsed && typeof parsed === "object" ? parsed : {};

  } catch {

    return {};

  }

};



const saveStatusOverrides = (overrides) => {

  try {

    sessionStorage.setItem(STATUS_OVERRIDES_KEY, JSON.stringify(overrides));

  } catch {

    // ignore quota / private mode

  }

};



const mapApiStatusToUi = (status) => {

  if (typeof status === "number") {

    // Common enum mappings:

    // 0/1/2 => Todo / In progress / Done

    // (fallback: 3 => Done)

    if (status === 0) return "Todo";

    if (status === 1) return "In progress";

    if (status === 2) return "Done";

    if (status === 3) return "Done";

  }



  const s = String(status ?? "").trim().toLowerCase();

  if (s === "todo" || s === "to_do" || s === "to-do") return "Todo";

  if (s === "in_progress" || s === "inprogress" || s === "in progress")

    return "In progress";

  if (s === "done" || s === "completed" || s === "complete") return "Done";

  // Handle APPROVED status from backend - map to Todo
  if (s === "approved") return "Todo";

  return "Todo";

};



/** When GET /api/Task omits `status`, mapApiStatusToUi falls back to Todo — use this to compare server truth. */

const getRawStatusFromTask = (task) =>

  task?.status ?? task?.Status ?? task?.state ?? task?.State;



const rawStatusToApiParam = (raw) => {

  if (raw == null || raw === "") {

    return null;

  }

  if (typeof raw === "number") {

    if (raw === 0) return "todo";

    if (raw === 1) return "in_progress";

    if (raw === 2 || raw === 3) return "done";

  }

  const s = String(raw).trim().toLowerCase();

  if (s === "todo" || s === "to_do" || s === "to-do") return "todo";

  if (s === "in_progress" || s === "inprogress" || s === "in progress")

    return "in_progress";

  if (s === "done" || s === "completed" || s === "complete") return "done";

  return null;

};



const MyTasksTab = () => {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);

  const [toastMessage, setToastMessage] = useState("");

  const toastTimerRef = useRef(null);

  const { addNotification } = useNotifications();



  const fetchTasks = useCallback(async () => {

    const token = localStorage.getItem("token");

    // Get current user ID
    let currentUserId = '';
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.userId) {
        currentUserId = storedUser.userId;
      }
    } catch (e) {
      console.error('Error getting user ID:', e);
    }

    if (!currentUserId) {
      console.error('User ID not found');
      return [];
    }

    const response = await axios.get(`http://taskflowproject1.runasp.net/api/User/${currentUserId}`, {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    });

    const tasksData = response.data.tasks || [];

    let overrides = loadStatusOverrides();



    // Drop overrides once API starts returning a real status for that task

    let overridesChanged = false;

    for (const task of tasksData) {

      const raw = getRawStatusFromTask(task);

      const idKey = String(task.id);

      if (raw != null && raw !== "" && overrides[idKey]) {

        delete overrides[idKey];

        overridesChanged = true;

      }

    }

    if (overridesChanged) {

      saveStatusOverrides(overrides);

    }



    // Convert API response to UI format
    return tasksData.map((task) => {

      const raw = getRawStatusFromTask(task);

      const idKey = String(task.id);

      const fallbackApiStatus = overrides[idKey];

      const effectiveRaw =

        raw != null && raw !== "" ? raw : fallbackApiStatus ?? raw;



      return {

        id: task.id.toString(),

        title: task.title,

        project: `Project ${task.projectID}`,

        dueDate: task.dueTime ? new Date(task.dueTime).toLocaleDateString() : "",

        priority:

          task.priority === 3 ? "high" : task.priority === 2 ? "medium" : "low",

        statusLabel: mapApiStatusToUi(effectiveRaw),

        description: task.discription || task.description || "", // Handle typo in API

        assignedTo: task.assignedMemberName || "Unassigned",

        createdBy: "Project Manager",

        lastUpdated: "Recently",

        attachments: [],

        comments: [],

        // Merge known status (from API or last successful PATCH) for downstream use

        originalTask: {

          ...task,

          ...(fallbackApiStatus && (raw == null || raw === "")

            ? { status: fallbackApiStatus }

            : {}),

        },

      };

    });

  }, []);



  // Fetch tasks from API

  useEffect(() => {

    const run = async () => {

      try {

        setLoading(true);

        const formattedTasks = await fetchTasks();

        setTasks(formattedTasks);

      } catch (error) {

        console.error("Error fetching tasks:", error);

        message.error("Failed to load tasks");

      } finally {

        setLoading(false);

      }

    };



    run();

  }, [fetchTasks]);



  const taskColumns = useMemo(() => {

    const todoItems = tasks.filter((task) => task.statusLabel === "Todo");

    const progressItems = tasks.filter((task) => task.statusLabel === "In progress");

    const doneItems = tasks.filter((task) => task.statusLabel === "Done");



    return [

      { id: "todo", title: "To Do", tone: "todo", items: todoItems },

      { id: "progress", title: "In Progress", tone: "progress", items: progressItems },

      { id: "done", title: "Completed", tone: "done", items: doneItems },

    ];

  }, [tasks]);



  const pushNotification = ({ type, title, message }) => {

    addNotification({ type, title, message });

    setToastMessage(message);



    if (toastTimerRef.current) {

      clearTimeout(toastTimerRef.current);

    }

    toastTimerRef.current = setTimeout(() => {

      setToastMessage("");

    }, 2500);

  };



  const handleSaveTask = async (updatedTask) => {

    try {

      const token = localStorage.getItem('token');

      const originalTask = updatedTask.originalTask;

      

      // Convert UI status back to API status

      const apiStatus = updatedTask.statusLabel === 'Todo' ? 'todo' 

                      : updatedTask.statusLabel === 'In progress' ? 'in_progress' 

                      : 'done';

      

      // Update task status using API

      await axios.patch(

        `http://taskflowproject1.runasp.net/api/Task/progress/${originalTask.id}?status=${apiStatus}`,

        {},

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      const overrides = loadStatusOverrides();

      overrides[String(originalTask.id)] = apiStatus;

      saveStatusOverrides(overrides);



      // Refresh from server to ensure persistence (what you see after refresh)

      const previousTask = tasks.find((task) => task.id === updatedTask.id);

      const formattedTasks = await fetchTasks();

      setTasks(formattedTasks);

      setSelectedTask(null);



      const serverTask = formattedTasks.find((t) => t.id === updatedTask.id);

      const serverRaw = serverTask ? getRawStatusFromTask(serverTask.originalTask) : null;

      const serverCanonical = rawStatusToApiParam(serverRaw);



      if (serverCanonical && serverCanonical !== apiStatus) {

        message.warning(

          "Server didn't persist the new status. Showing server state.",

        );

      } else {

        message.success("Task updated successfully");

      }



      if (previousTask && previousTask.assignedTo !== updatedTask.assignedTo) {

        pushNotification({

          type: "assigned",

          title: "Task assigned to you",

          message: `Task "${updatedTask.title}" assigned to ${updatedTask.assignedTo}.`,

        });

      } else {

        pushNotification({

          type: "updated",

          title: "Task updated",

          message: `Task "${updatedTask.title}" updated successfully.`,

        });

      }

    } catch (error) {

      console.error('Error updating task:', error);

      message.error('Failed to update task');

    }

  };



  return (

    <>

      {toastMessage && (

        <div className="fixed right-5 top-5 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 shadow">

          {toastMessage}

        </div>

      )}



      {loading ? (

        <div className="flex justify-center items-center h-64">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>

        </div>

      ) : (

        <>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

            {taskColumns.map((column) => (

              <TaskColumn

                key={column.id}

                title={column.title}

                count={column.items.length}

                items={column.items}

                tone={column.tone}

                onTaskClick={setSelectedTask}

              />

            ))}

          </div>



          <TaskDetailsModal

            key={selectedTask?.id}

            task={selectedTask}

            onClose={() => setSelectedTask(null)}

            onSave={handleSaveTask}

          />

        </>

      )}

    </>

  );

};



export default MyTasksTab;

