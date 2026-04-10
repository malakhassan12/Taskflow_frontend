import React, { useMemo, useRef, useState } from "react";
import TaskColumn from "../TaskBoard/TaskColumn";
import TaskDetailsModal from "../TaskBoard/TaskDetailsModal";
import { useNotifications } from "../../../../Context/NotificationsProvider";

const initialTasks = [
  {
    id: "t1",
    title: "Set up contact form",
    project: "Website Redesign",
    dueDate: "4/20/2024",
    priority: "high",
    statusLabel: "Todo",
    description: "Create contact form with validation and email integration",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
  {
    id: "t1b",
    title: "Prepare FAQ section",
    project: "Website Redesign",
    dueDate: "4/23/2024",
    priority: "medium",
    statusLabel: "Todo",
    description: "Draft FAQs and map each item to contact form flows.",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
  {
    id: "t2",
    title: "Research payment APIs",
    project: "API Integration",
    dueDate: "4/25/2024",
    priority: "high",
    statusLabel: "In progress",
    description: "Compare Stripe and PayPal options and document integration risks.",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
  {
    id: "t2b",
    title: "Implement API auth flow",
    project: "API Integration",
    dueDate: "4/27/2024",
    priority: "medium",
    statusLabel: "In progress",
    description: "Integrate secure token flow and test refresh strategy.",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
  {
    id: "t3",
    title: "Design homepage mockup",
    project: "Website Redesign",
    dueDate: "4/18/2024",
    priority: "low",
    statusLabel: "Done",
    description: "Create final homepage mockup and share design handoff notes.",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
  {
    id: "t3b",
    title: "Finalize hero section assets",
    project: "Website Redesign",
    dueDate: "4/16/2024",
    priority: "low",
    statusLabel: "Done",
    description: "Export final hero illustrations and optimize image sizes.",
    assignedTo: "Emma Wilson",
    createdBy: "Sarah Johnson",
    lastUpdated: "about 2 years ago",
    attachments: [],
    comments: [],
  },
];

const MyTasksTab = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef(null);
  const { addNotification } = useNotifications();

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

  const handleSaveTask = (updatedTask) => {
    const previousTask = tasks.find((task) => task.id === updatedTask.id);
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
    setSelectedTask(updatedTask);

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
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 shadow">
          {toastMessage}
        </div>
      )}

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
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default MyTasksTab;
