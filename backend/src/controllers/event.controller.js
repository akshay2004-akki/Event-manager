import { isValidObjectId } from "mongoose";
import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      dateTime,
      location,
      category,
      coordinatorName,
      coordinatorContact,
      coordinatorEmail,
      club,
      department,
      facultyName,
      facultyEmail,
      description,
      eventImage,
    } = req.body;

    if (
      !eventName ||
      !dateTime ||
      !location ||
      !category ||
      !coordinatorName ||
      !coordinatorContact ||
      !coordinatorEmail ||
      !club ||
      !department ||
      !facultyName ||
      !facultyEmail ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEvent = await Event.create({
      eventName,
      dateTime,
      location,
      category,
      coordinatorName,
      coordinatorContact,
      coordinatorEmail,
      club,
      department,
      facultyName,
      facultyEmail,
      description,
      eventImage,
    });

    return res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Event Creation Error:", error);
    return res.status(500).json({ error: "Failed to create event." });
  }
};

export const getEvent = async (req, res) => {
   try {
    const getAllEvents = await Event.find({});

    if(!getAllEvents){
      return new Error("No events Found");
    }

    return res.status(200).json({events : getAllEvents})

   } catch (error) {
    
   } 
};

export const getEventById = async(req,res)=>{
  const {eventid} = req.params;

  if(!isValidObjectId(eventid)){
    return new Error("Invalid event Id");
  }

  const event = await Event.find({_id:eventid})

  return res.status(200).json(event)

}

