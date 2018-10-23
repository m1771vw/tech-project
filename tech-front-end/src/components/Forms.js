import React, { Component } from 'react';

/**
 * Suggestions for working on this:
 *  - Work on it one piece at a time
 *      - Ex: Pass in one label, one text, etc.
 *  - Once you have one piece, move it into an array
 * 
 */
class Forms  extends Component {
    state = {
        
    }

    render() {
        return (
            <div className="pageClass">
            <form onSubmit={this.handleSubmit}>
                {/* <div className="field">
                    <label>Employee Name</label>
                    <input type="text" onChange={handleOnChange} value={employeeName}
                        name="employeeName" className="input" />
                </div>
                <div className="field">
                    <label>Employee Title</label>
                    <input type="text" onChange={handleOnChange} value={employeeTitle}
                        name="employeeTitle" className="input" />
                </div>
                <div className="field">
                    <label>Employee Project Participation</label>
                    <input type="text" onChange={handleOnChange} value={employeeProjects}
                        name="employeeProjects" className="input" />
                </div> */}

                {/* <div key={someItem+index}>
                    <label>{SomeLabelNameItem}</label>
                    <input type={someTypeItem} onChange={someObject} value={someLabelName}
                        name="someLabelName" className={someCSSClassName} />
                </div> */}
                <div>
                    <label>Assignment Name</label>
                    <input type="text"
                        name="someLabelName"  />
                </div>

                {/* // this.props.someArray.map((someItem, index) => {
                //     return(
                //         <div key={someItem+index}></label>
                //             <label>{//SomeLabelNameItem}</label>
                //             <input type={someTypeItem} onChange={someObject} value={someLabelName}
                //                 name="someLabelName" className={someCSSClassName} />
                //         </div>
                //     )
                // }) */}
                <button className="button">Submit</button>
            </form>
            </div>
        )
    }
    
}

// Forms.propTypes = {
//     someArray: array,
//     someLabelArray: array //Assignment Example: ["Assignment Name", "Assignment Description"...]
//     someTypeItem: string // Assignment Example: "text"

//     ...
// }

export default Forms;