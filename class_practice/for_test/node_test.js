const db = {
    people: [
        {
            "ssn": "A199999999",
            "name": "黃小弟",
            "severity": 1,
            "location": {
                "name": "臺灣大學",
                "description": "10617臺北市大安區羅斯福路四段1號"
            }
        },
        {
            "ssn": "A177777777",
            "name": "張小弟",
            "severity": 2,
            "location": {
                "name": "臺灣大學",
                "description": "10617臺北市大安區羅斯福路四段1號"
            }
        }
    ]
}
const location = ['臺北市','test'];
const test = (number, location,db) => {
    const answer = location.map((l)=>{
        const everylocation = db.people.filter((e)=> e.severity>=number && e.location.description.includes(l))
        return everylocation.length
    });
    return answer
}

console.log(test(1,location,db));




