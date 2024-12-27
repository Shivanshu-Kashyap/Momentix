const mongoose = require('mongoose');
const Blog = require('../model/Blog.js');

// Fetch all blogs
const fetchListOfBlogs = async (req, res) => {
    try {
        const blogList = await Blog.find();
        if (!blogList || blogList.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }
        return res.status(200).json({ blogList });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch blogs', error });
    }
};

// Add a new blog
const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreatedBlog = new Blog({
        title,
        description,
        date: currentDate,
    });

    try {
        await newlyCreatedBlog.save();
        return res.status(201).json({ message: 'Blog added successfully', newlyCreatedBlog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add blog', error });
    }
};

// Delete a blog by ID
const deleteABlog = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to delete blog', error });
    }
};

// Update a blog by ID
const updateABlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const currentBlogToUpdate = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated document
        );

        if (!currentBlogToUpdate) {
            return res.status(404).json({ message: 'Blog not found or unable to update' });
        }

        return res.status(200).json({ message: 'Blog updated successfully', currentBlogToUpdate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to update blog', error });
    }
};

module.exports = {
    fetchListOfBlogs,
    addNewBlog,
    deleteABlog,
    updateABlog,
};
