function rendertaskTemplate(task) {
    return `
    <li data-task-id="${task.id}" class="task ${task.completed ? "completed" : ""}"> 
            <label class="checkbox-label">
          <input class="checkbox-1" type="checkbox" data-action="completed" ${task.completed ? "checked" : ""}>
          <span class="checkmark"></span>
        </label>
        ${task.title}
        <button data-action="update" class="update-button"> ✏️ </button>
        <button data-action="delete" class="delete-button"> ❌</button>
    </li>
    `;
}
