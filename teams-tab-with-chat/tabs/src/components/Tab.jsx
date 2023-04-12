import { useContext } from "react"; 
import { TeamsFxContext } from "./Context"; 
import { Button } from "@fluentui/react-northstar";
import "./sample/Welcome.css";
import { app, people, chat } from "@microsoft/teams-js";    

export default function Tab() { 
  const { themeString } = useContext(TeamsFxContext);
  const startChat = async (caseId) => { 
    await app.initialize(); 
    const context = await app.getContext(); 
    if (people.isSupported() && chat.isSupported()) { 
        const peoplePickerResults = await people.selectPeople();
        const users = peoplePickerResults.map(p => p.email); 
        await chat.openGroupChat({ 
            users, 
            topic: "Case Chat " + caseId, 
            message: "This is a test chat. Enjoy working on the case!", 
        }); 
      } 
  }   
  return ( 
    <div className={themeString === "default" ? "" : "dark"}> 
      <div className="welcome page"> 
        <div className="narrow page-padding">
          <h1 className="center">Case Chat 1.0</h1> 
          <div className="sections"> 
            <div className="center">
              <input name="searchTxt" type="text" maxlength="512" id="searchTxt" class="searchField"/>
              {"\n"}
              <Button primary onClick={() => startChat(document.getElementById("searchTxt").value)}>Start Chat</Button> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}