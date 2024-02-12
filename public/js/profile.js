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
    for (const property in fieldCurrentValues) {
        initFieldData(property);
    editFieldDataListeners(property);
      }
      
}
function editFieldDataListeners(fieldId){
    var  field = document.getElementById(fieldId);
    var editButton = field.querySelector('.edit');
    var confirmButton = field.querySelector('.check');
    var cancelButton = field.querySelector('.cross');
    var dataField = field.querySelector('.data-field');
    editButton.addEventListener("click",()=>{
        dataField.contentEditable = true;
        dataField.classList.add("editable");
        // dataField.style.backgroundColor = "#eee"; 
        // dataField.style.color= "#000";
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    })
    confirmButton.addEventListener("click",()=>{
        //add validations.
        fieldCurrentValues[fieldId]=dataField.innerHTML; // TODO: Backend call
        dataField.contentEditable = false;
        // dataField.style.backgroundColor = "transparent"; 
        dataField.classList.remove("editable");

        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    });
    cancelButton.addEventListener("click",()=>{
        dataField.innerHTML =fieldCurrentValues[fieldId];
        dataField.contentEditable = false;
        // dataField.style.backgroundColor = "transparent"; 
        dataField.classList.remove("editable");

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