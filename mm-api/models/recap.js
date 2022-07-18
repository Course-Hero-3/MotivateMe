const db = require("../db")
const { BadRequestError, UnauthorizedError, ForbiddenError } = require("../utils/errors")
require("dotenv").config()


class Recap {
    static async letterGradesPerCategory(userId, category) {
        const text = 
        `
            SELECT  COUNT(*) FILTER (WHERE c.score >= 90) AS "A",
                COUNT(*) FILTER (WHERE c.score BETWEEN 80 AND 89.99) AS "B",
                COUNT(*) FILTER (WHERE c.score BETWEEN 70 AND 79.99) AS "C",
                COUNT(*) FILTER (WHERE c.score BETWEEN 60 AND 69.99) AS "D",
                COUNT(*) FILTER (WHERE c.score < 60) AS "F"
            FROM completed as c
                INNER JOIN tasks as t ON c.user_id=t.user_id AND c.task_id=t.task_id
            WHERE c.user_id=$1 AND t.category=$2
        `;
        
        const values = [userId, category.toLowerCase()];
        const result = await db.query(text, values);

        let labels = []
        let actualData = []
        let fieldsInRow = ["A", "B", "C", "D", "F"]
        fieldsInRow.forEach((letter) => {
            if (result.rows[0][letter] != 0) {
                labels.push(letter)
                actualData.push(result.rows[0][letter])
            }
        })
        if (actualData.length === 0) {
            return null
        }
        return { "type": "pie",
                "label": `Amount of Letter Grades for ${category}s`,
                "labels": labels,
                "actualData": actualData }
    }
    
    static async averagePerCategory(userId) {
        const text = `
        SELECT t.category, ROUND(AVG(c.score)::numeric, 2) AS "average"
        FROM completed as c
            INNER JOIN tasks as t ON c.user_id=t.user_id AND c.task_id=t.task_id
        WHERE c.user_id=$1 
        GROUP BY t.category
        `;
        const values = [userId];
        const result = await db.query(text, values);

        let labels = []
        let actualData = []
        result.rows.forEach((catPlusAverage) => {
            labels.push(catPlusAverage.category)
            actualData.push(catPlusAverage.average)
        })

        return { "type": "bar",
                "label": "Average Per Category",
                "labels": labels,
                "actualData": actualData }
    }
    
    static async getFactsByUserId(userId) {
        let listOfFacts = []

        // Averages per Categories Bar Chart
        listOfFacts.push(await Recap.averagePerCategory(userId))

        let perCategory = null
        // Test Pie Chart
        perCategory = await Recap.letterGradesPerCategory(userId, "Test")
        if (perCategory !== null) {
            listOfFacts.push(perCategory)
        }
        // Project Pie Chart
        perCategory = await Recap.letterGradesPerCategory(userId, "Project")
        if (perCategory !== null) {
            listOfFacts.push(perCategory)
        }
        // Quiz Pie Chart
        perCategory = await Recap.letterGradesPerCategory(userId, "Quiz")
        if (perCategory !== null) {
            listOfFacts.push(perCategory)
        }
        

        return listOfFacts
    }

    // {
    //     “type”: “type of graph”,
    //      “label”: “title of the graph”,
    //     “labels”: [“cat1”, “cat2”, ... “catx”],
    //     “actualData”: [1, 2, 3, 4, 5]
    // }

    
}


module.exports = Recap