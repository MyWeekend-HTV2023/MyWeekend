import { React } from 'react';
export default function Item(props) {
    return (
        <div class='overflow-clip flex justify-between px-10 py-5'>
            <img src={props.image}></img>
        </div>
    )
}