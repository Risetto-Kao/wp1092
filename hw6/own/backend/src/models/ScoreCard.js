// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number



// export default model('ScoreCard', scoreCardSchema);

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ScoreCardSchema = new Schema({
    name: String,
    subject: String,
    score: Number,
  
}, {
    collection: 'ScoreCard',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
const ScoreCard = mongoose.model('ScoreCard',ScoreCardSchema);

export default ScoreCard;