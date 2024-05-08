import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)


    function handleEdit() {
        setIsEditing((editing) => !editing)

        if (isEditing) {
            onNameChange(symbol, playerName)
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>

    if (isEditing) {
        editablePlayerName = <input value={playerName} onChange={handleChange} type="text" defaultValue={initialName} required />
    }


    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}