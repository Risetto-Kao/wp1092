// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from 'mongoose';

const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ScoreCardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  subject: {
    type: String,
    required: [true, 'subject field is required.']
  },
  score: {
    type: Number,
    required: [true, 'Number field is required.']
  }
})

// Creating a table within database with the defined schema
//const Message = mongoose.model('message', ScoreCardSchema)

// Exporting table for querying and mutating
export default mongoose.model('ScoreCard', ScoreCardSchema);

// module.exports = Message