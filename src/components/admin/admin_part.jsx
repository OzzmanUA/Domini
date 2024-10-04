import React, { useState } from "react";
import "./admin_style.css";
// const [User, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }])
// const fetchRooms = async () => {
//   setIsLoading(true)
//   try {
//     const result = await getAllRooms()
//     setRooms(result)
//     setIsLoading(false)
//   } catch (error) {
//     setErrorMessage(error.message)
//     setIsLoading(false)
//   }
// }
const usersData = [
  { login: "johndoe", email: "johndoe@example.com", phone: "123-456-7890" },
  { login: "janedoe", email: "janedoe@example.com", phone: "987-654-3210" },
  { login: "smithjohn", email: "smithjohn@example.com", phone: "456-789-1234" },
  { login: "dfsfsn", email: "sdgdfgdf.com", phone: "4365564654" },
];

const UserList = () => {
  const [users, setUsers] = useState(usersData);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ login: "", email: "", phone: "" });

  // Удаление пользователя
  const deleteUser = (login) => {
    setUsers(users.filter((user) => user.login !== login));
  };

  // Включение режима редактирования
  const editUser = (user) => {
    setEditingUser(user.login);
    setFormData({ login: user.login, email: user.email, phone: user.phone });
  };

  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Сохранение изменений
  const saveChanges = () => {
    setUsers(
      users.map((user) =>
        user.login === editingUser ? { ...user, ...formData } : user
      )
    );
    setEditingUser(null);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.login} className="user-item">
            {editingUser === user.login ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  placeholder="Login"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                <button onClick={saveChanges}>Save</button>
              </div>
            ) : (
              <>
                <span>{user.login}</span> | <span>{user.email}</span> |{" "}
                <span>{user.phone}</span>
                <div>
                  <button onClick={() => editUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.login)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
