# TaskFlow - Project Management System

TaskFlow هو نظام إدارة مشاريع يساعد الفرق على تنظيم التاسكات ومتابعة تقدم المشاريع بشكل فعال.

---

## **Overview**

المشروع عبارة عن نظام لإدارة المشاريع، بيتيح للفرق تنظيم التاسكات، توزيع الشغل، ومتابعة التقدم لكل مشروع. كل مستخدم له دور محدد داخل النظام:

- **Admin**: مسؤول عن النظام كله والموافقة على الحسابات الجديدة ومتابعة كل المشاريع والمستخدمين.
- **Project Manager**: مسؤول عن المشروع نفسه، إنشاء المشاريع، توزيع التاسكات، ومتابعة أداء الفريق.
- **Team Member**: الشخص اللي بينفذ التاسكات، يحدث حالتها، يضيف Comments ويرفع الملفات المتعلقة بها.

---

## **Actors & Roles**

### **1. Admin**
- تسجيل الدخول والخروج (Login / Logout)  
- إدارة حسابات Project Managers الجديدة (Accept / Reject)  
- عرض كل المستخدمين (Managers و Members)  
- تعديل أو حذف أي مستخدم  
- تحديد Role لكل مستخدم  
- متابعة كل المشاريع الموجودة  
- حذف أو تعديل أي مشروع  
- Dashboard:  
  - عدد المستخدمين الكلي  
  - عدد Project Managers و Members  
  - عدد المشاريع  
  - عدد التاسكات  
  - إحصائيات عامة  

### **2. Project Manager**
- إنشاء وتعديل المشاريع (Name + Description)  
- إنشاء وتعديل التاسكات داخل المشروع:  
  - Title, Description, Priority, Due Date, Assigned Member  
- توزيع Tasks على Members (Assign)  
- متابعة حالة Tasks: To Do / In Progress / Done  
- قبول أو رفض التاسكات بعد التنفيذ  
- إضافة Comments على التاسكات  
- Dashboard لكل مشروع:  
  - نسبة التقدم  
  - عدد Tasks في كل حالة  
  - Deadlines قريبة  
  - أداء Members  

### **3. Team Member**
- استقبال Tasks المخصصة له  
- تحديث حالة Task: To Do → In Progress → Done  
- إضافة Comments على التاسكات  
- رفع ملفات (Attachments) مرتبطة بالتاسك  
- إرسال Notifications للـ Project Manager بعد إنهاء Task  
- متابعة كل التاسكات المخصصة له من مشاريع مختلفة  
- تنظيم الشغل حسب الأولوية: High / Medium / Low  

---

## **Project & Tasks Structure**

### **Project**
- Name  
- Description  
- Manager  
- Created At  
- يحتوي على عدة Tasks  
- كل Project ممكن يكون له عدة Members  

### **Task**
- Title  
- Description  
- Assigned Member  
- Priority (High / Medium / Low)  
- Due Date  
- Status (To Do / In Progress / Done)  
- يمكن إضافة Comments و Files  

### **Workflow**
Tasks تتحرك بين الحالات:  
1. To Do  
2. In Progress  
3. Done  

---

## **Requirements**
- كل Actor يقدر Login / Logout  
- Admin يدير حسابات Project Managers الجديدة  
- Project Manager ينشئ Projects وTasks  
- Members يحدثوا حالة Tasks، يضيفوا Comments ويرفعوا Files  
- Project Manager يرى إحصائيات المشروع  
- Members يستقبلوا Notifications عند تعيين Tasks أو تحديثها  
- استخدام Real-Time Sockets للـ Notifications (مثل: WebSockets أو Socket.IO)  

---

## **Database Schema**
- **Users**: id, name, email, role, password, status  
- **Projects**: id, name, description, manager_id, created_at  
- **Tasks**: id, project_id, title, description, assigned_member_id, priority, due_date, status  
- **Comments**: id, task_id, member_id, comment_text, created_at  
- **Files**: id, task_id, member_id, file_path, created_at  
- **Notifications**: id, user_id, type, message, read_status, created_at  

---

## **Tech Stack**
- **Front-End**: HTML, CSS, JavaScript, React/Vue (حسب اختيارك)  
- **Back-End**: Node.js / PHP / Python (حسب اختيارك)  
- **Database**: MySQL / PostgreSQL / MongoDB  
- **Real-Time Notifications**: WebSockets / Socket.IO  

---

## **How to Run**
1. Clone the repository:
```bash
git clone https://github.com/malakhassan12/Taskflow_frontend.git
