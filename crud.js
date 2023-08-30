const BASE_URL = "http://localhost:8000/tasks/";

function updateItemsLeftCount() {
    const activeTasks = document.querySelectorAll('.task:not(.completed)').length;
    const itemsLeftElement = document.getElementById('items-left');
    itemsLeftElement.textContent = `${activeTasks} ${activeTasks === 1 ? 'item' : 'items'} left`;
  }
 
  async function createTask(task){
    try {
        const response = await  fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });


        const json = await response.json();
        await fetchTasks();
        return json;

    } catch (error) {
        throw new Error(error);
    }

}

    async function deleteTask(task_id){
        try {
            const response = await  fetch(`${BASE_URL}${task_id}`, {
                method: 'DELETE',
            });
            updateItemsLeftCount();
        } catch (error) {
            throw new Error(error);
        }
    }


    async function updateTask(task_id, task){
        try {
            const response = await  fetch(`${BASE_URL}${task_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });
    
    
            const json = await response.json();
            updateItemsLeftCount();
            return json;
    
        } catch (error) {
            throw new Error(error);
        }
    }




const taskslist = document.getElementById("taskslist");

async function fetchTasks(options = {}){

    const queryParams = new URLSearchParams({
        ...options,
        page: options.page || 1, // Default to page 1 if not specified
        page_size: options.page_size || 5, // Default to 10 tasks per page if not specified
    }).toString();
    const response = await fetch(`${BASE_URL}?${queryParams}`);
    const data = await response.json();
    const tasks = data.results;
    const totalPages = data.total_pages;
    let tasksListRenderString ="";
    for(let task of tasks) {
                tasksListRenderString = tasksListRenderString + rendertaskTemplate(task);
            }
            taskslist.innerHTML = tasksListRenderString;
            updateItemsLeftCount();

            renderPageNumbers(totalPages);
}

fetchTasks();

async function fetchTask(task_id) {
    const response = await fetch (`${BASE_URL}${task_id}/`);
    return await response.json();
}