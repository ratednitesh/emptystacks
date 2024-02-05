export function pushPopupMessage(data) {
    let el = document.createElement('DIV');
    el.classList.add('popup');
    el.innerHTML = data[1];
    let color;
    switch(data[0]){
        case 'SUCCESS': color = "#38c464"; break;
        case 'FAILURE': color = "#c5503b"; break;
        case 'WARNING': color = "#eab735"; break;
        case 'INFO': color = "#33a6e8";
    }
    el.style.backgroundColor = color;
    document.body.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 5000);
  }