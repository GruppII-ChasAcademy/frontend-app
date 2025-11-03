<div align="center">

# **Postaexperts**

 A modern **package management system** built with **Next.js**, global state, and role-based access control.  
Scan, track, and monitor packages in real time — with temperature tracking, delivery statuses, and smart alert handling.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Context API](https://img.shields.io/badge/Global_State-Context_API-blue?style=for-the-badge)
![CSS](https://img.shields.io/badge/Styling-CSS-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

</div>

---

## **Overview**

**Postaexperts** is a full-featured logistics and package management system designed to simplify tracking and monitoring workflows.  
Admins, drivers, and customers each have their own tailored experience through **role-based access** and **global state management**.

🔹 Scan packages  
🔹 Track delivery status in real time  
🔹 Monitor temperature and environmental data  
🔹 Receive alerts for abnormal conditions  
🔹 Manage users and permissions  

---

## **Core Features**

### Package Tracking
- Add, update, and monitor package status  
- Real-time updates of delivery data  
- Filter by state: *In Transit*, *Delivered*, *Delayed*  

###  Temperature & Sensors
- Display current package temperature  
- Alerts when exceeding or dropping below defined thresholds  
- Historical temperature and sensor logs  

###  User Roles
| Role | Permissions |
|------|--------------|
| **Admin** | Full access, manage users, configure system |
| **Driver** | View and update assigned packages |
| **Support** | Manage alerts and customer issues |
| **Customer** | View personal deliveries and statuses |

### Alerts & Notifications
- Color-coded alerts for quick status overview  
- Visual indicators for critical states  
- (Upcoming) Push notifications and live updates  

---

## **Tech Stack**

| Category | Technology |
|-----------|------------|
| **Frontend** | Next.js (App Router), React |
| **State Management** | React Context API / Global State |
| **Styling** | CSS Modules / TailwindCSS |
| **Authentication** | JWT / Context-based Auth |


---

## **Installation**

### Clone the project
```bash
git clone https://github.com/GruppII-ChasAcademy/frontend-app
cd frontend-app
npm install
npx expo start
