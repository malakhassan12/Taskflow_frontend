import React, { useState } from "react";

import { FiBell, FiCheckCircle, FiClock, FiEdit3, FiUserPlus, FiTrash2, FiCheck, FiXCircle } from "react-icons/fi";

import { useNotifications } from "../Context/NotificationsProvider";

import { useTheme } from "../Context/DarkModeProvider";

import { formatNotificationRelative } from "../Utils/notificationDate";
import { notificationHeadline } from "../Utils/notificationDisplay";



const toneByType = {

  assigned: "bg-blue-50 text-blue-600",

  updated: "bg-amber-50 text-amber-600",

  comment: "bg-emerald-50 text-emerald-600",

  task_accept: "bg-green-50 text-green-700",

  task_reject: "bg-rose-50 text-rose-700",

};



const iconByType = {

  assigned: FiUserPlus,

  updated: FiEdit3,

  comment: FiCheckCircle,

  task_accept: FiCheckCircle,

  task_reject: FiXCircle,

};



const Notifications = () => {

  const { notifications, clearNotifications, markAsRead, removeNotification, refetch } = useNotifications();

  const { isDarkMode } = useTheme();

  const [loading, setLoading] = useState(false);

  const handleClearAll = () => {
    setLoading(true);
    clearNotifications();
    setLoading(false);
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleDelete = async (notificationId) => {
    await removeNotification(notificationId);
  };



  return (

    <section className="mx-auto w-full max-w-4xl space-y-5">

      <header>

        <h2 className={`text-3xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Notifications</h2>

        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Stay updated with your task assignments and changes.</p>

      </header>



      <div className={`rounded-2xl border p-4 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>

        <div className="mb-3 flex items-center justify-between gap-2">

          <div className="flex items-center gap-2">

            <FiBell className={`h-4 w-4 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} />

            <p className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Recent Updates</p>

          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refetch}
              className={`rounded-md px-2 py-1 text-xs ${isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
            >
              Refresh
            </button>
            {notifications.length > 0 && (

              <button

                type="button"

                onClick={handleClearAll}

                disabled={loading}

                className={`rounded-md px-2 py-1 text-xs ${isDarkMode ? "text-slate-300 hover:bg-slate-800 disabled:opacity-50" : "text-slate-500 hover:bg-slate-100 disabled:opacity-50"}`}

              >

                Clear all

              </button>

            )}
          </div>

        </div>



        {loading ? (

          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Loading notifications...</p>

        ) : notifications.length === 0 ? (

          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>No notifications yet.</p>

        ) : (

          <div className="space-y-2">

            {notifications.map((item) => {

              const Icon = iconByType[item.type] || FiCheckCircle;

              const tone = toneByType[item.type] || "bg-slate-100 text-slate-600";

              return (

                <article key={item.id} className={`flex items-start gap-3 rounded-lg border p-3 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-100"}`}>

                  <span className={`rounded-full p-2 ${tone}`}>

                    <Icon className="h-4 w-4" />

                  </span>

                  <div className="min-w-0 flex-1">

                    <h3 className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{notificationHeadline(item)}</h3>

                    <p className={`mt-0.5 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{item.message}</p>

                    <p className={`mt-1 flex items-center gap-1 text-[11px] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>

                      <FiClock className="h-3 w-3" />

                      {formatNotificationRelative(item.createdAt)}

                    </p>

                  </div>

                  <div className="flex items-center gap-1">
                    {!item.isRead && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(item.id)}
                        className={`rounded p-1.5 ${isDarkMode ? "text-slate-400 hover:bg-slate-700" : "text-slate-500 hover:bg-slate-100"}`}
                        title="Mark as read"
                      >
                        <FiCheck className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className={`rounded p-1.5 ${isDarkMode ? "text-slate-400 hover:bg-slate-700" : "text-slate-500 hover:bg-slate-100"}`}
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>

                </article>

              );

            })}

          </div>

        )}

      </div>

    </section>

  );

};



export default Notifications;

