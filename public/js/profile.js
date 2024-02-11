var fieldCurrentValues = {
    "username" :"Nitesh S.",
    "about-me":"I am a curious little kid.",
    "work":"Vice President",
    "location": "India",
    "tech-stack":"JAVA Developer",
    "facebook":"ratednitesh",
    "instagram":"ratednitesh",
    "linkedin":"ratednitesh",
    "github":""
};

export function initProfile(){
    initFieldData("username");
    editFieldDataListeners("username");
    initFieldData("about-me");
    editFieldDataListeners("about-me");
    initFieldData("work");
    editFieldDataListeners("work");
    initFieldData("location");
    editFieldDataListeners("location");
    initFieldData("tech-stack");
    editFieldDataListeners("tech-stack");
    initFieldData("facebook");
    editFieldDataListeners("facebook");
    initFieldData("instagram");
    editFieldDataListeners("instagram");
    initFieldData("linkedin");
    editFieldDataListeners("linkedin");
    initFieldData("github");
    editFieldDataListeners("github");
}
function editFieldDataListeners(fieldId){
    var  field = document.getElementById(fieldId);
    var editButton = field.querySelector('.edit');
    var confirmButton = field.querySelector('.check');
    var cancelButton = field.querySelector('.cross');
    var dataField = field.querySelector('.data-field');
    editButton.addEventListener("click",()=>{
        dataField.contentEditable = true;
        dataField.style.backgroundColor = "#eee"; 
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    })
    confirmButton.addEventListener("click",()=>{
        //add validations.
        fieldCurrentValues[fieldId]=dataField.innerHTML; // TODO: Backend call
        dataField.contentEditable = false;
        dataField.style.backgroundColor = "transparent"; 
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    });
    cancelButton.addEventListener("click",()=>{
        dataField.innerHTML =fieldCurrentValues[fieldId];
        dataField.contentEditable = false;
        dataField.style.backgroundColor = "transparent"; 
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    });
}
function initFieldData(fieldId){
    var  field = document.getElementById(fieldId);
    var dataField = field.querySelector('.data-field');
    dataField.innerHTML =fieldCurrentValues[fieldId];
}