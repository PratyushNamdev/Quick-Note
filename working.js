let add = document.getElementById("add");
let box = document.querySelector('[data-box]');
let id = 0;
// <div class="note">
//
// </div>

function addNote(text="" , val=""){
   let div = document.createElement("div");
   div.classList.add("note");

   if(val == ""){
      div.innerHTML = `
      <div class="btn">
          
        <button  class="save-btn"><img  src="/unsave.png" alt="" title="Save"></button>
         <button  class="delete-btn">  <img src="/delete.png"  alt="delete" title="Delete"></button>
      </div>
   <textarea name="text" placeholder="write here..." class="txt"  cols="30" rows="10">${text}</textarea>
   <div id="${JSON.stringify(Math.random())}"></div>
      `;
   }
   else if(val != ""){
      div.innerHTML = `
      <div class="btn">
         <button  class="save-btn"><img class="save-icon" src="/saved.png" alt="save" title="Saved" ></button>
         <button  class="delete-btn">  <img src="/delete.png"  alt="delete" title="Delete"></button>
      </div>
   <textarea name="text" class="txt"  cols="30" rows="10">${text}</textarea>
   <div id="${val}"></div>
      `;
   }
      
      box.appendChild(div);

      div.querySelector('.save-btn').addEventListener('click' , ()=>{
         let data = div.querySelector('.txt').value;
         let saveImg = div.querySelector(".save-btn");
         let icon = div.querySelector('.save-icon');
    
        
         if( icon == null){
            localStorage.setItem( div.lastElementChild.id , JSON.stringify(data));
            saveImg.innerHTML = `<img class="save-icon" src="/saved.png" alt="" title="Saved"></img>`;
         }
         else{
            localStorage.removeItem(div.lastElementChild.id);
            saveImg.innerHTML = `<img  src="/unsave.png" alt="" title="Save">`;
         }

      })
     
      div.querySelector('.txt').addEventListener('input' ,()=>{
         let saveImg = div.querySelector(".save-btn");
         saveImg.innerHTML = `<img  src="/unsave.png" alt="" title="Saved"></img>`;
      })

      div.querySelector('.delete-btn').addEventListener('click' , ()=>{
           localStorage.removeItem(div.lastElementChild.id);
        
          div.remove();
      })
}

add.addEventListener("click", ()=>{
   addNote();
});



(()=>{
   //alert(localStorage.getItem('txt-0'))
  if(localStorage.length == 0){
   addNote();
  }
    for(let i=0 ; i < localStorage.length; i++){
      let val = localStorage.key(i);
      let text = localStorage.getItem(val) 
      addNote(JSON.parse(text) , val);
      
    }
})();