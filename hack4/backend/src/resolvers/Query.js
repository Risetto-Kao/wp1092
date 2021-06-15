const Query = {
    statsCount(parent, { severity, locationKeyWords }, { db }, info) {
        try {
            if (!locationKeyWords) throw new Error(`No locationKeyWords`);
            const queryCount = locationKeyWords.map((keyword)=>{
                const locationCount = db.people.filter((e)=> e.severity>=severity && e.location.description.includes(keyword));
                console.log(locationCount);
                return locationCount.length
            })
            console.log(queryCount);
            return queryCount;
        } catch (error){
            return null
        }
        
    },
}

export default Query;