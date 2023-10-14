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
        <ul className="items">
            {data.map((item, index) => (
                <li key={index}>{
                    <div className="card">
                        <img src="https://www.cntower.ca/sites/default/files/styles/16_9_scale_and_crop_large/public/images/explore-cn-tower%20.jpg?h=5ce0254a&itok=A_rLcJHm" alt="" />
                        
                        <div className="card-info">
                            <div className="name">{item.name}</div>
                            <div className="description">{item.description}</div>  
                            <div className="time">TIme: 8:00pm</div>
                        </div>
                       
                    </div>
                }</li>
            ))}

        </ul>
    </>
  );
}

export { Plan };