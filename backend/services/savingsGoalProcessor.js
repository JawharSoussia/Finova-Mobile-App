// const SavingsGoal = require("../models/Budget");
// const User = require("../models/User");
// const { sendEmail } = require("./emailService"); // À implémenter

// const processOldestGoal = async () => {
//   try {
//     const nextGoal = await SavingsGoal.findOne({ status: 'pending' })
//       .sort({ priority: -1, createdAt: 1 })
//       .populate('userId');

//     if (!nextGoal) return;

//     const now = new Date();
//     const isAchieved = nextGoal.currentAmount >= nextGoal.targetAmount;
//     const isExpired = now > nextGoal.targetDate;

//     if (isAchieved || isExpired) {
//       console.log(`Processing goal "${nextGoal.name}" (${nextGoal._id})`);
//       console.log(`Status: ${isAchieved ? 'Achieved' : 'Expired'}`);
//       console.log(`Current Amount: ${nextGoal.currentAmount}€ / Target: ${nextGoal.targetAmount}€`);

//       await sendGoalCompletionNotification(nextGoal, isAchieved);

//       const update = { 
//         status: isAchieved ? 'completed' : 'expired',
//         completedAt: new Date()
//       };

//       await SavingsGoal.findByIdAndUpdate(nextGoal._id, update);
//       console.log(`✅ Goal status updated to: ${isAchieved ? 'completed' : 'expired'}`);
//     }
//   } catch (error) {
//     console.error("Error processing goal:", error);
//     throw error;
//   }
// };

// const sendGoalCompletionNotification = async (goal, isAchieved) => {
//   try {
//     const user = await User.findById(goal.userId);
//     if (!user?.email) return;

//     const subject = isAchieved 
//       ? `🎉 Objectif "${goal.name}" atteint !`
//       : `⚠️ Objectif "${goal.name}" expiré`;

//     const message = isAchieved
//       ? `Vous avez atteint votre objectif d'épargne "${goal.name}" (${goal.targetAmount}€).`
//       : `Votre objectif "${goal.name}" n'a pas été atteint à temps.`;

//     await sendEmail({
//       to: user.email,
//       subject,
//       html: `<h1>${isAchieved ? 'Félicitations !' : 'Objectif expiré'}</h1>
//             <p>${message}</p>`
//     });

//     console.log(`Notification FIFO envoyée pour: ${goal._id}`);
//   } catch (error) {
//     console.error("Erreur notification FIFO:", error);
//     throw error;
//   }
// };

// module.exports = { processOldestGoal };