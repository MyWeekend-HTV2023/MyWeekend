function Plan({data}) {
    
    return (
    <>  
        <ul>
            {Object.keys(data).map((item, index) => (
                <li key={index}>{
                    <Item data={data[item]} day={index+1}/>
                }</li>
            ))}
        </ul>

    </>
  );
}

function Item({data, day}) {
  return (
    <>  
        <div className="day">Day {day}</div>
        <ul>
            {data.map((item, index) => (
                <li key={index}>{
                    <div className="card">
                        <div className="name">Activity: {item.name}</div>
                        <div className="description">{item.description}</div>
                    </div>
                }</li>
            ))}

        </ul>
    </>
  );
}

export { Plan };