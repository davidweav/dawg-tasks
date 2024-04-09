

export default async function handler(req, res) {

    res.status(200).json({posts:[
        {
            taskId: 200,
            publisher: "davidweav",
            description: "Help me walk my dog",
            dueDate: "Friday April 12",
            reward: 10,
            status: "Unclaimed"
        },
        {
            taskId: 200,
            publisher: "adamruehle",
            description: "Wipe my ass",
            dueDate: "Thursday April 11",
            reward: 100,
            status: "Unclaimed"
        }]
        
    })
    
}