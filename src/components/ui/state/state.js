import React from 'react'
export default function Loader({state, closeModal}) {
    return(
        <>
        <div class="app-modal-overlay">
    <div class="app-modal-div success" style={{ textAlign:'center'}}>
        {
            state == 'success' ?  <div > <div class="alert-icon"></div> <div class="alert-message">Operation Successful</div> </div> : 
            
            <div> 
            <div class="alert-icon failed"></div>
            <div class="alert-message">Operation Failed</div>
            </div>
            
        } 
     <div onClick={closeModal} style={{cursor:'pointer'}} className="app-modal-button">Close</div>
    </div>
  </div>
        </>
    )
}