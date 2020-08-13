import React, { createContext, useState } from 'react'

// -- Create a new Context, optionally specify the default value within the ()
export const AutoContexts = createContext()

export const AutoProvider = props => {

    const [loggedin, SetLoggedin] = useState(false)
    const [formaction, setFormaction] = useState('add')
	
	const somefunction = () => {
		alert("This is a function call")
	}
	
	const returnval = {
		loggedin, SetLoggedin, formaction, setFormaction, somefunction
    }
	return (
		<AutoContexts.Provider value={returnval}>
			{props.children}
		</AutoContexts.Provider>
	)
}