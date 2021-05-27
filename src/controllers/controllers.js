const { notion } = require('../notion/client');

const getAllApplications = async (req, res) => {
    const data = await notion.databases.query({
        database_id: process.env.DB_ID
    });

    const pages = data.results.map(page => {
        return {
            id: page.id,
            created: page.created_time,
            updated: page.last_edited_time,
            company: page.properties.Company.title[0].plain_text,
            position: page.properties.Position.select.name,
            status: page.properties.Status.select.name,
            deadline: page.properties['Next Deadline'].date.start,
            jobDescription: page.properties['Job Description'].url,
            comments: page.properties.Comments.rich_text[0].plain_text
        }
    });

    return pages;
};

const getApplication = async (req, res) => {
    const page = await notion.pages.retrieve({
        page_id: req.params.id
    });

    return {
        id: page.id,
        created: page.created_time,
        updated: page.last_edited_time,
        company: page.properties.Company.title[0].plain_text,
        position: page.properties.Position.select.name,
        status: page.properties.Status.select.name,
        deadline: page.properties['Next Deadline'].date.start,
        jobDescription: page.properties['Job Description'].url,
        comments: page.properties.Comments.rich_text[0].plain_text
    };
};

const addApplication = async (req, res) => {
    const newPage = await notion.pages.create({
        parent: {
            database_id: process.env.DB_ID
        },
        properties: {
            Company: {
                title: [
                    {
                        text: {
                            content: req.body.company
                        }
                    }
                ]
            },
            Position: {
                select: {
                    name: req.body.position
                }
            },
            Status: {
                select: {
                    name: req.body.status
                }
            },
            'Next Deadline': {
                date: {
                    start: req.body.deadline
                }
            },
            'Job Description': {
                url: req.body.url
            },
            Comments: {
                rich_text: [
                    {
                        text: {
                            content: req.body.comments
                        }
                    }
                ]
            }
        }
    });

    return newPage;
};

const updateApplication = async (req, res) => {
    const updatedPage = await notion.pages.update({
        page_id: req.params.id,
        properties: {
            Company: {
                title: [
                    {
                        text: {
                            content: req.body.company
                        }
                    }
                ]
            },
            Position: {
                select: {
                    name: req.body.position
                }
            },
            Status: {
                select: {
                    name: req.body.status
                }
            },
            'Next Deadline': {
                date: {
                    start: req.body.deadline
                }
            },
            'Job Description': {
                url: req.body.url
            },
            Comments: {
                rich_text: [
                    {
                        text: {
                            content: req.body.comments
                        }
                    }
                ]
            }
        }
    });

    return updatedPage;
};

const filterApplications = async (req, res) => {
    const data = await notion.databases.query({
        database_id: process.env.DB_ID,
        filter: {
            property: 'Company',
            text: {
                contains: req.query.company || ''
            }
        }
    });

    const pages = data.results.map(page => {
        return {
            id: page.id,
            created: page.created_time,
            updated: page.last_edited_time,
            company: page.properties.Company.title[0].plain_text,
            position: page.properties.Position.select.name,
            status: page.properties.Status.select.name,
            deadline: page.properties['Next Deadline'].date.start,
            jobDescription: page.properties['Job Description'].url,
            comments: page.properties.Comments.rich_text[0].plain_text
        }
    });
    
    return pages;
};

module.exports = {
    getAllApplications,
    getApplication,
    addApplication,
    updateApplication,
    filterApplications
};