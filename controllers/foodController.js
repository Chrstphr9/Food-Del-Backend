import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {
    const { name, description, category, price } = req.body; // Destructure price from req.body
    const image_filename = req.file?.filename || ''; // Handle missing file gracefully

    // Ensure price is converted to a number
    const numericPrice = parseFloat(price);

    // Validate the numericPrice
    if (isNaN(numericPrice)) {
        return res.status(400).json({ success: false, message: "Invalid price format. Must be a number." });
    }

    const food = new foodModel({
        name,
        description,
        price: numericPrice, // Store the numeric value
        category,
        image: image_filename
    });

  
    try {
        await food.save();
        res.json({success:true, message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}

// remove food item 
const removeFood = async (req, res) => {
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
}
}








export {addFood, listFood, removeFood}