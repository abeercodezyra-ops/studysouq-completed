import Section from '../../models/Section.js';
import Subject from '../../models/Subject.js';

// @desc    Get all sections (public)
// @route   GET /api/sections
// @access  Public
export const getSections = async (req, res) => {
  try {
    const { subject } = req.query;
    const query = { isActive: true };
    
    if (subject) {
      query.subject = subject;
    }

    const sections = await Section.find(query)
      .populate('subject', 'name level')
      .select('name description subject order slug isPremium')
      .sort('order')
      .lean();

    res.status(200).json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error("ERROR ORIGIN: getSections", error.stack || error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sections',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get sections by subject (public)
// @route   GET /api/subjects/:id/sections
// @access  Public
export const getSectionsBySubject = async (req, res) => {
  try {
    const sections = await Section.find({ 
      subject: req.params.id,
      isActive: true 
    })
      .populate('subject', 'name level')
      .select('name description subject order slug isPremium')
      .sort('order')
      .lean();

    res.status(200).json({
      success: true,
      data: sections
    });
  } catch (error) {
    console.error("ERROR ORIGIN: getSectionsBySubject", error.stack || error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sections',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single section (public)
// @route   GET /api/sections/:id
// @access  Public
export const getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate('subject', 'name level')
      .select('name description subject order slug isPremium')
      .lean();

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Section not found'
      });
    }

    res.status(200).json({
      success: true,
      data: section
    });
  } catch (error) {
    console.error("ERROR ORIGIN: getSectionById", error.stack || error);
    res.status(500).json({
      success: false,
      message: 'Error fetching section',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

