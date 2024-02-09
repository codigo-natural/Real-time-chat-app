export const sendMessage = async (req, res) => {
try {
  
} catch (error) {
  console.log("Error in sedMessage controller: ", error.message)
  res.status(500).json({ error: "Internal server error"})
}
}