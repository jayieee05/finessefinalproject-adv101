const User = require('../models/User');
const pool = require('../config/database');

// Script to set a user as owner
// Usage: node database/set_owner.js <email>

async function setOwner(email) {
  try {
    const user = await User.findByEmail(email);
    
    if (!user) {
      console.error(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    if (user.role === 'owner') {
      console.log(`✅ User ${email} is already an owner`);
      process.exit(0);
    }

    await User.updateRole(user.id, 'owner');
    console.log(`✅ Successfully set ${email} as owner`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting owner:', error);
    process.exit(1);
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error('Usage: node database/set_owner.js <email>');
  console.error('Example: node database/set_owner.js admin@finesse.com');
  process.exit(1);
}

setOwner(email);

