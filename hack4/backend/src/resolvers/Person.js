const Person = {
    location(parent, args, {db}, info){
        return db.people.filter((person)=>{
            return person.ssn === parent.ssn;
        })
    },
};

export default Person