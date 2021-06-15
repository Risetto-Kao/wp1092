const Mutation = {
    insertPeople(parent, args, {db}, info){
        let result = true;
        try {
            args.data.map((human)=>{
                const samessn = db.people.filter((person)=>person.ssn === human.ssn);
                console.log(samessn)
                if (samessn.length === 0) {

                    db.people.push(human)
                    console.log(human)
                }
                else {
                    console.log('ssn is existing'); 
                     result = false;  
                }
            })
            
           return result
           
        } catch (error) {
            console.log(error);
            return false;
        }

    },

}

export default Mutation;