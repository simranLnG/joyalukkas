import React from 'react';
import { useState } from 'react';
import { BasicForm } from 'src/components/Formik/BasicForm/BasicForm.js';
import { AdvancedForm } from 'src/components/Formik/AdvancedForm/AdvancedForm.js';

const customStyle = {
  textAlign: 'center'
}

const FormikForm = () => {

    const [view, setView] = useState("basic");
    return (
        <div>

        <div>FormikForm</div>
        <nav>
        <h3 onclick= {() => setView("basic")}
        style={{color: view === "basic" ? "#fff" : ""}}
        >
            Basic
        </h3>

        <h3 onclick= {() => setView("advanced")}
        style={{color: view === "basic" ? "#fff" : ""}}
        >
            Advanced
        </h3>
        </nav>

        {view === "basic" ? <BasicForm/> :<AdvancedForm/>}
        </div>
        )
}

export default FormikForm