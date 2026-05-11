import React, { useEffect, useRef, useState } from "react";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiEdit2,
  FiFile,
  FiMessageCircle,
  FiPaperclip,
  FiSend,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../../../../Context/DarkModeProvider";
import { primaryColor } from "../../../../Constants/Colors";
import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

const getAuthUserId = () => {
  const token = localStorage.getItem("token");
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token) {
    return stored.email || "";
  }
  try {
    const decoded = jwtDecode(token);
    return (
      decoded.sub ||
      decoded.nameid ||
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ||
      decoded.userId ||
      decoded.UserId ||
      stored.email ||
      ""
    );
  } catch {
    return stored.email || "";
  }
};

const API_BASE = "http://taskflowproject1.runasp.net";

/** Returns server comment id for API routes, or null for local-only rows (e.g. temp id). */
const getCommentApiId = (comment) => {
  const raw = comment.apiId ?? comment.id;
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0 || n > 2147483647) {
    return null;
  }
  return n;
};

const emptyDraft = {
  title: "",
  statusLabel: "Todo",
  priority: "medium",
  description: "",
  dueDate: "",
  deadline: "",
  lastUpdated: "about 2 years ago",
  attachments: [],
  comments: [],
};

const TaskDetailsModal = ({ task, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const [draft, setDraft] = useState(emptyDraft);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const fileInputRef = useRef(null);
  const [managerId, setManagerId] = useState("");

  // Fetch attachments from API
  const fetchAttachments = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE}/api/Attachment/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mapped = response.data.map((att) => ({
        id: att.fileId || att.id || att.attachmentId || att.Id || att.AttachmentId,
        name: att.fileName || att.name || att.FileName || "Attachment",
        size: att.size ? `${(att.size / 1024).toFixed(1)} KB` : "Unknown",
        url: att.filePath || att.url || att.FilePath || "",
      }));

      return mapped;
    } catch (error) {
      console.error("Error fetching attachments:", error);
      return [];
    }
  };

  // Fetch comments from API
  const fetchComments = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = getAuthUserId();
      const receiverId = managerId || "";
      
      if (!taskId || !userId || !receiverId) {
        console.log("Missing required params for comments:", { taskId, userId, receiverId });
        return [];
      }

      // Fetch comments between member and manager
      const response = await axios.get(`${API_BASE}/api/Comment/ById`, {
        params: {
          SenderId: userId,
          ReciverID: receiverId,
          TaskId: taskId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const mapped = (response.data || []).map((c) => ({
        id: String(c.id || c.commentId || c.Id || c.CommentId),
        apiId: c.id || c.commentId || c.Id || c.CommentId,
        text: c.comment || c.text || c.Comment || c.Text || "",
        author: c.userName || c.author || c.userId || "User",
        userId: c.senderId || c.SenderId || c.userId || "",
        createdAt: c.createdAt || c.CreatedAt || c.uploadDate || new Date().toISOString(),
      }));

      return mapped;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  // Fetch manager ID from project
  const fetchManagerId = async (projectId) => {
    console.log("fetchManagerId called with projectId:", projectId);
    if (!projectId) {
      console.error("projectId is null or undefined");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Fetching project data from:", `${API_BASE}/api/Project/${projectId}`);
      const response = await axios.get(`${API_BASE}/api/Project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Project data response:", response.data);
      console.log("Project data keys:", Object.keys(response.data || {}));
      
      const managerId = response.data?.manegerID || response.data?.managerId || response.data?.ManagerId || response.data?.createdBy || response.data?.CreatedBy || "";
      console.log("Fetched managerId:", managerId);
      console.log("All possible manager ID fields:", {
        manegerID: response.data?.manegerID,
        managerId: response.data?.managerId,
        ManagerId: response.data?.ManagerId,
        createdBy: response.data?.createdBy,
        CreatedBy: response.data?.CreatedBy,
        userId: response.data?.userId,
        UserId: response.data?.UserId,
      });
      setManagerId(managerId);
    } catch (error) {
      console.error("Error fetching manager ID:", error);
      console.error("Error response:", error.response?.data);
    }
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!task) {
      setDraft(emptyDraft);
      setNewComment("");
      setEditingCommentId(null);
      setEditingText("");
      setManagerId("");
      return;
    }

    const loadAttachments = async () => {
      const taskId = task.originalTask?.id;
      if (taskId) {
        const attachments = await fetchAttachments(taskId);
        setDraft((prev) => ({
          ...prev,
          attachments,
        }));
      }
    };

    const loadComments = async () => {
      const taskId = task.originalTask?.id;
      if (taskId) {
        const comments = await fetchComments(taskId);
        setDraft((prev) => ({
          ...prev,
          comments,
        }));
      }
    };

    const dueTimeRaw = task.originalTask?.dueTime;
    const dueDateValue = dueTimeRaw ? new Date(dueTimeRaw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) : "";
    const deadlineValue = dueTimeRaw ? new Date(dueTimeRaw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) : "";
    
    setDraft({
      title: task.title || "",
      statusLabel: task.statusLabel || "Todo",
      priority: task.priority || "medium",
      description: task.description || "",
      dueDate: dueDateValue,
      deadline: deadlineValue,
      lastUpdated: task.lastUpdated || "about 2 years ago",
      attachments: task.attachments || [],
      comments: task.comments || [],
    });

    loadAttachments();
    
    // Fetch managerId from project
    const loadManagerId = async () => {
      const projectId = task.originalTask?.projectID;
      if (projectId) {
        await fetchManagerId(projectId);
      }
    };
    loadManagerId();
    
    setNewComment("");
    setEditingCommentId(null);
    setEditingText("");
  }, [task]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Load comments when managerId is set
  useEffect(() => {
    if (task?.originalTask?.id && managerId) {
      const loadComments = async () => {
        const comments = await fetchComments(task.originalTask.id);
        setDraft((prev) => ({
          ...prev,
          comments,
        }));
      };
      loadComments();
    }
  }, [managerId, task]);

  if (!task) {
    return null;
  }

  const canSave = !!(
    draft.title.trim()
  );

  const handleFieldChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      return;
    }

    const taskId = task.originalTask?.id;
    if (taskId == null) {
      message.error("Cannot upload attachment: task is missing an id.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${API_BASE}/api/Attachment/upload/${taskId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const mapped = {
          id: response.data?.id || response.data?.attachmentId || response.data?.Id || response.data?.AttachmentId || `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          url: response.data?.url || response.data?.filePath || response.data?.FilePath || "",
        };

        setDraft((prev) => ({
          ...prev,
          attachments: [...prev.attachments, mapped],
        }));
      }

      message.success("Attachment uploaded successfully");
    } catch (error) {
      console.error("Error uploading attachment:", error);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null);
      message.error(detail || "Failed to upload attachment (Backend error: Foreign Key constraint)");
    }

    event.target.value = "";
  };

  const removeAttachment = async (attachmentId) => {
    if (!attachmentId) {
      message.error("Cannot remove attachment: missing attachment ID");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      console.log("Deleting attachment:", attachmentId);
      await axios.delete(`${API_BASE}/api/Attachment/Delete`, {
        params: { attachmentId: attachmentId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Attachment deleted successfully:", attachmentId);

      setDraft((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((item) => item.id !== attachmentId),
      }));

      message.success("Attachment removed successfully");
    } catch (error) {
      console.error("Error removing attachment:", error);
      console.error("Error response:", error.response?.data);
      // Fallback to local removal if API fails
      setDraft((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((item) => item.id !== attachmentId),
      }));
    }
  };

  const downloadAttachment = async (attachmentId, fileName) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${API_BASE}/api/Attachment/download/${attachmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "attachment");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      message.success("Attachment downloaded successfully");
    } catch (error) {
      console.error("Error downloading attachment:", error);
      message.error("Failed to download attachment");
    }
  };

  const addComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed) {
      return;
    }

    const taskId = task.originalTask?.id;
    console.log("Adding comment - taskId:", taskId);
    if (taskId == null) {
      message.error("Cannot add comment: task is missing an id.");
      return;
    }

    const userId = getAuthUserId();
    console.log("Adding comment - userId:", userId);
    if (!userId) {
      message.error("Cannot add comment: please sign in again.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const receiverId = managerId || "";
      console.log("Adding comment - managerId:", managerId, "receiverId:", receiverId);

      if (!receiverId) {
        message.error("Cannot add comment: manager ID not found");
        return;
      }

      const payload = {
        id: 0,
        comment: trimmed,
        taskId,
        senderId: userId,
        receiverId: receiverId,
      };
      console.log("Adding comment - payload:", payload);

      const response = await axios.post(
        `${API_BASE}/api/Comment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Adding comment - response:", response.data);

      const rowId = response.data?.id || response.data?.commentId;
      const apiId =
        response.data?.id || response.data?.commentId || response.data?.Id || response.data?.CommentId
          ? String(
              response.data?.id ||
                response.data?.commentId ||
                response.data?.Id ||
                response.data?.CommentId
            )
          : null;
      setDraft((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          {
            id: String(rowId),
            apiId,
            text: trimmed,
            author: "You",
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      setNewComment("");
      message.success("Comment saved");
    } catch (error) {
      console.error("Error adding comment:", error);
      console.error("Error response:", error.response?.data);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null);
      message.error(detail || "Failed to save comment");
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text || "");
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const saveEditedComment = async (comment) => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      message.error("Enter comment text");
      return;
    }
    const commentId = getCommentApiId(comment);
    if (commentId == null) {
      setDraft((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === comment.id ? { ...c, text: trimmed } : c,
        ),
      }));
      cancelEditComment();
      message.success("Comment updated locally");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE}/api/Comment/${commentId}`,
        JSON.stringify(trimmed),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setDraft((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c.id === comment.id ? { ...c, text: trimmed } : c,
        ),
      }));
      cancelEditComment();
      message.success("Comment updated");
    } catch (error) {
      console.error("Error updating comment:", error);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null);
      message.error(detail || "Failed to update comment");
    }
  };

  const deleteComment = async (comment) => {
    const commentId = getCommentApiId(comment);
    if (commentId == null) {
      setDraft((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== comment.id),
      }));
      if (editingCommentId === comment.id) {
        cancelEditComment();
      }
      message.success("Comment removed");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/api/Comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDraft((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.id !== comment.id),
      }));
      if (editingCommentId === comment.id) {
        cancelEditComment();
      }
      message.success("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment:", error);
      const detail =
        error.response?.data?.message ||
        error.response?.data?.title ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null);
      message.error(detail || "Failed to delete comment");
    }
  };

  const handleSave = async () => {
    if (!canSave) {
      return;
    }

    const taskId = task.originalTask?.id;
    if (taskId == null) {
      message.error("Cannot save task: task is missing an id.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const priorityMap = {
        low: 0,
        medium: 1,
        high: 2,
      };

      const statusMap = {
        "Todo": "todo",
        "In progress": "in_progress",
        "Done": "done",
      };

      const payload = {
        id: 0,
        title: draft.title,
        discription: draft.description,
        projectID: task.originalTask?.projectID || 0,
        priority: draft.priority === "low" ? 0 : draft.priority === "medium" ? 2 : draft.priority === "high" ? 3 : 0,
        dueTime: draft.dueDate ? new Date(draft.dueDate).toISOString() : null,
        status: statusMap[draft.statusLabel] || "todo",
      };

      console.log("PUT payload:", payload);
      console.log("PUT URL:", `${API_BASE}/api/Task?taskID=${taskId}`);

      await axios.put(`${API_BASE}/api/Task`, payload, {
        params: { taskID: taskId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      message.success("Task updated successfully");
      onSave?.({
        ...task,
        ...draft,
        lastUpdated: "just now",
      });
    } catch (error) {
      console.error("Error saving task:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      if (error.response?.status === 403) {
        message.error("Permission denied: Members cannot update tasks. Only managers can update tasks.");
      } else {
        const detail =
          error.response?.data?.message ||
          error.response?.data?.title ||
          (typeof error.response?.data === "string"
            ? error.response.data
            : null);
        message.error(detail || "Failed to save task");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8">
      <div
        className={`max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border p-4 shadow-xl ${
          isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="w-full rounded-md border border-slate-200 px-2 py-1 text-sm font-medium text-slate-800"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <select
            value={draft.statusLabel}
            onChange={(e) => handleFieldChange("statusLabel", e.target.value)}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs"
          >
            <option>Todo</option>
            <option>In progress</option>
            <option>Done</option>
          </select>
          <select
            value={draft.priority}
            onChange={(e) => handleFieldChange("priority", e.target.value)}
            className="rounded-md border border-slate-200 px-2 py-1 text-xs"
          >
            <option>high</option>
            <option>medium</option>
            <option>low</option>
          </select>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FiEdit2 className="h-3.5 w-3.5" />
            Description
          </p>
          <p className="w-full whitespace-pre-wrap rounded-md bg-slate-50 px-2 py-1.5 text-xs leading-relaxed text-slate-600">
            {draft.description || "No description provided"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="space-y-1">
            <p className="flex items-center gap-2"><FiCalendar className="h-3.5 w-3.5" />Due Date</p>
            <input
              value={draft.dueDate}
              readOnly
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-2"><FiClock className="h-3.5 w-3.5" />Deadline</p>
            <input
              value={draft.deadline}
              readOnly
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1"
            />
          </div>
        </div>

        <div className="mt-4 rounded-md border border-slate-200 p-3 text-xs text-slate-600">
          <p className="mb-2 flex items-center gap-2 font-medium">
            <FiPaperclip className="h-3.5 w-3.5" />
            Attachments ({draft.attachments.length})
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50"
          >
            Add Attachment
          </button>
          {draft.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {draft.attachments.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
                  <span className="flex items-center gap-1 text-xs">
                    <FiFile className="h-3.5 w-3.5" />
                    {file.name} ({file.size})
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => downloadAttachment(file.id, file.name)}
                      className="rounded p-1 text-blue-500 hover:bg-blue-50"
                      aria-label="Download attachment"
                    >
                      <FiDownload className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.id)}
                      className="rounded p-1 text-rose-500 hover:bg-rose-50"
                      aria-label="Remove attachment"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-md border border-slate-200 p-3 text-xs text-slate-600">
          <p className="mb-2 flex items-center gap-2 font-medium">
            <FiMessageCircle className="h-3.5 w-3.5" />
            Comments ({draft.comments.length})
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
              placeholder="Add a comment..."
              className="w-full rounded-md border border-slate-200 px-2 py-1"
            />
            <button
              type="button"
              onClick={addComment}
              className="rounded-md bg-indigo-100 p-2 text-indigo-700 hover:bg-indigo-200"
              aria-label="Add comment"
            >
              <FiSend className="h-3.5 w-3.5" />
            </button>
          </div>
          {draft.comments.length > 0 && (
            <div className="mt-2 space-y-2">
              {draft.comments.map((comment, index) => {
                const isEditing = editingCommentId === comment.id;
                const isOwnComment = comment.userId === getAuthUserId();
                const isManager = comment.userId === managerId;
                return (
                  <div
                    key={comment.id || index}
                    className={`flex items-start justify-between gap-2 rounded-md px-2 py-1.5 ${
                      isDarkMode ? "bg-slate-800" : isManager ? "bg-blue-50" : "bg-slate-50"
                    }`}
                  >
                    <div className="min-w-0 flex-1 text-start">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold text-slate-600">
                          {isManager ? "Manager" : isOwnComment ? "You" : comment.author}
                        </span>
                        {isManager && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">Manager</span>
                        )}
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveEditedComment(comment);
                            }
                            if (e.key === "Escape") {
                              cancelEditComment();
                            }
                          }}
                          className={`w-full rounded border px-2 py-1 text-xs ${
                            isDarkMode
                              ? "border-slate-600 bg-slate-900 text-slate-100"
                              : "border-slate-200 bg-white text-slate-800"
                          }`}
                          autoFocus
                        />
                      ) : (
                        <p className="break-words text-xs leading-relaxed">
                          {comment.text}
                        </p>
                      )}
                    </div>
                    {isOwnComment && (
                      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => saveEditedComment(comment)}
                              className={`rounded px-2 py-1 text-[11px] font-medium ${
                                isDarkMode
                                  ? "bg-emerald-900/50 text-emerald-300 hover:bg-emerald-900/70"
                                  : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              }`}
                              title="Save"
                              aria-label="Save comment"
                            >
                              <FiCheck className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditComment}
                              className={`rounded px-2 py-1 text-[11px] ${
                                isDarkMode
                                  ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                              }`}
                              title="Cancel"
                              aria-label="Cancel editing"
                            >
                              <FiX className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => startEditComment(comment)}
                              className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium ${
                                isDarkMode
                                  ? "bg-indigo-900/40 text-indigo-200 hover:bg-indigo-900/60"
                                  : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                              }`}
                              aria-label="Edit comment"
                            >
                              <FiEdit2 className="h-3.5 w-3.5 shrink-0" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteComment(comment)}
                              className={`inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium ${
                                isDarkMode
                                  ? "bg-rose-900/40 text-rose-200 hover:bg-rose-900/60"
                                  : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                              }`}
                              aria-label="Delete comment"
                            >
                              <FiTrash2 className="h-3.5 w-3.5 shrink-0" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-md px-3 py-1.5 text-xs hover:bg-slate-100">
            Cancel
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
