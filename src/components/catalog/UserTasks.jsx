import React, { useEffect, useState } from 'react';
import { getUserTasks, completeTask, cancelTask, reportTask, leaveReview } from '../utils/ApiFunctions';

const UserTasks = () => {
    const [createdTasks, setCreatedTasks] = useState([]);
    const [acceptedTasks, setAcceptedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token] = useState(localStorage.getItem('token')); // Assuming token is stored in localStorage
    const [userId] = useState(localStorage.getItem('userId')); // Assuming userId is stored in localStorage
    const [reviewContent, setReviewContent] = useState(""); // State for review input
  
    // Fetch user tasks on component mount
    useEffect(() => {
      const fetchTasks = async () => {
        setLoading(true);
        try {
          const userTasks = await getUserTasks(userId, token);
          console.log(userTasks) // Fetch all tasks for the user
          setCreatedTasks(userTasks.createdTasks); // Set created tasks
          setAcceptedTasks(userTasks.acceptedTasks); // Set accepted tasks
        } catch (error) {
          console.error('Error fetching user tasks:', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTasks();
    }, [userId, token]);
  
    const handleComplete = async (taskId) => {
      try {
        const message = await completeTask(taskId, token);
        alert(message); // Alert the user on success
        // Optionally refresh tasks after completion
      } catch (error) {
        alert("Error completing task: " + error.message);
      }
    };
  
    const handleCancel = async (taskId) => {
      try {
        const message = await cancelTask(taskId, token);
        alert(message); // Alert the user on success
        // Optionally refresh tasks after cancellation
      } catch (error) {
        alert("Error canceling task: " + error.message);
      }
    };
  
    const handleReport = async (taskId) => {
      try {
        const message = await reportTask(taskId, token);
        alert(message); // Alert the user on success
        // Optionally refresh tasks after reporting
      } catch (error) {
        alert("Error reporting task: " + error.message);
      }
    };
  
    const handleReview = async (taskId, token) => {
      if (!reviewContent) {
        alert("Please enter a review.");
        return;
      }
  
      const reviewDTO = {
        content: reviewContent, // Adjust the review structure based on your DTO
      };
  
      try {
        const message = await leaveReview(taskId, reviewDTO);
        alert(message); // Alert the user on success
        setReviewContent(""); // Clear the review input
        // Optionally refresh tasks after leaving a review
      } catch (error) {
        alert("Error leaving review: " + error.message);
      }
    };
  
    if (loading) {
      return <div>Loading tasks...</div>;
    }
  
    return (
      <div className="tasks-container">
        <h2>Мої завдання</h2>
  
        {/* Render Created Tasks */}
        <div className="tasks-section">
          <h3>Створені завдання</h3>
          {createdTasks.length > 0 ? (
            createdTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.description}</h4>
                <p>Ціна: {task.price} грн</p>
                <p>Статус: {task.status}</p>
                <p>Дата завершення: {task.completionDate}</p>
                {task.workerName && <p>Виконавець: {task.workerName}</p>}
                <button onClick={() => handleComplete(task.id)}>Завершити</button>
                <button onClick={() => handleCancel(task.id)}>Скасувати</button>
                <button onClick={() => handleReport(task.id)}>Поскаржитися</button>
                {task.status === 'COMPLETED' && (
                  <div>
                    <textarea
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="Введіть ваш відгук"
                    />
                    <button onClick={() => handleReview(task.id)}>Відправити відгук</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Немає створених завдань.</p>
          )}
        </div>
  
        {/* Render Accepted Tasks */}
        <div className="tasks-section">
          <h3>Прийняті завдання</h3>
          {acceptedTasks.length > 0 ? (
            acceptedTasks.map((task) => (
              <div key={task.id} className="task-card">
                <h4>{task.description}</h4>
                <p>Ціна: {task.price} грн</p>
                <p>Статус: {task.status}</p>
                <p>Дата завершення: {task.completionDate}</p>
                {task.clientName && <p>Замовник: {task.clientName}</p>}
                <button onClick={() => handleComplete(task.id)}>Завершити</button>
                <button onClick={() => handleCancel(task.id)}>Скасувати</button>
                <button onClick={() => handleReport(task.id)}>Поскаржитися</button>
                {task.status === 'COMPLETED' && (
                  <div>
                    <textarea
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      placeholder="Введіть ваш відгук"
                    />
                    <button onClick={() => handleReview(task.id)}>Відправити відгук</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Немає прийнятих завдань.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default UserTasks;