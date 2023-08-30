
const addTaskForm = document.getElementById('add-task-form'); 
const addTaskButton = document.getElementById('add-task');
const UpdateTaskButton = document.getElementById('update-task');
const titleInputElement = document.getElementById('task-title');
const allTab = document.querySelector(".all");
const activeTab = document.querySelector(".active");
const completedTab = document.querySelector(".completedtxt");
const clearCompletedButton = document.querySelector('.clearbutton');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageNumbersContainer = document.getElementById('page-numbers');

let currentPage = 1; // Initial page

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchTasks({ page: currentPage });
  }
});

nextPageButton.addEventListener('click', () => {
  currentPage++;
  fetchTasks({ page: currentPage });
});

async function renderPageNumbers(totalPages) {
  let pageNumbersHTML = '';
  for (let page = 1; page <= totalPages; page++) {
    const isActive = page === currentPage ? 'active' : '';
    pageNumbersHTML += `<button class="page-number ${isActive}" data-page="${page}">${page}</button>`;
  }
  pageNumbersContainer.innerHTML = pageNumbersHTML;

  const pageNumberButtons = document.querySelectorAll('.page-number');
  pageNumberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentPage = parseInt(button.getAttribute('data-page'));
      fetchTasks({ page: currentPage });
    });
  });
}





clearCompletedButton.addEventListener('click', async () => {
    const tasks = document.querySelectorAll('.completed');
    
    for (const task of tasks) {
        const task_id = task.getAttribute('data-task-id');
        await deleteTask(task_id);
    }
    fetchTasks(); // Update the task list and "Items left" count
});






allTab.addEventListener("click", function () {
  fetchTasks();
});

activeTab.addEventListener("click", function () {
  fetchTasks({ completed: false });
});

completedTab.addEventListener("click", function () {
  fetchTasks({ completed: true });
});
 







addTaskForm.addEventListener('submit', async (e)=> {
    e.preventDefault();

});


addTaskButton.addEventListener('click', async function(e)  {
    const formData = new FormData(addTaskForm);
    const task = {
        title: formData.get('title'),
    }
    

    await createTask(task);
    fetchTasks();
    addTaskForm.reset();

});

UpdateTaskButton.addEventListener('click', async function(e) {
    const formData = new FormData(addTaskForm);
    const task_id = formData.get('task-id'); // Define task_id here
    const task = {
        title: formData.get('title'),
    };


    await updateTask(task_id, task);
    fetchTasks();
    addTaskForm.reset();
    addTaskForm.classList.remove('editing-task')
});

// Add keydown event listeners for the input fields
titleInputElement.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        const formData = new FormData(addTaskForm);
        const task_id = formData.get('task-id'); // Define task_id here

        if (addTaskForm.classList.contains('editing-task')) {
            await updateTask(task_id, {
                title: titleInputElement.value,
            });
            fetchTasks();
            addTaskForm.reset();
            addTaskForm.classList.remove('editing-task');
        } else {
            // Create a new task
            const task = {
                title: titleInputElement.value,
            };
            await createTask(task);
            fetchTasks();
            addTaskForm.reset();
        }
    }
});



    

 const taskList = document.getElementById('taskslist')

 taskList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('checkbox-1')) {
      const li = e.target.closest('li');
      const task_id = li.getAttribute('data-task-id');
      const task = await fetchTask(task_id);
      await updateTask(task_id, { ...task, completed: !task.completed });
      fetchTasks();
    } else if (e.target.nodeName === 'BUTTON') {
      const action = e.target.getAttribute('data-action');
      if (action === 'completed') {
        const li = e.target.parentNode;
        const task_id = li.getAttribute('data-task-id');
        const task = await fetchTask(task_id);
        await updateTask(task_id, { ...task, completed: !task.completed });
        fetchTasks();
      } else if (e.target.getAttribute('data-action') === 'delete') {
        const li = e.target.closest('li');
        const task_id = li.getAttribute('data-task-id');
        await deleteTask(task_id);
        fetchTasks();
      } else if (action === 'update') {
        const li = e.target.parentNode;
        const task_id = li.getAttribute('data-task-id');
        const task = await fetchTask(task_id);
        const taskIdInputElement = document.getElementById('task-id');
        const titleInputElement = document.getElementById('task-title');
        taskIdInputElement.value = task.id;
        titleInputElement.value = task.title;
        addTaskForm.classList.add('editing-task');
      }
    }
  });
