import { Knex } from "knex";
import { hashPassword } from '../../utils/bcrypt.password'
import { v4 as uuidv4 } from "uuid"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Helper function to create users with hashed passwords
    async function createUser(name: string, email: string, password: string, role: string) {
        return {
            id: uuidv4(),
            name,
            email,
            password: await hashPassword(password),
            role
        }
    }

    // Seed entries for users
    const users = [
        await createUser('Super Admin 1', 'superadmin1@gmail.com', 'superadmin1', 'superadmin'),
        await createUser('Super Admin 2', 'superadmin2@gmail.com', 'superadmin2', 'superadmin'),
        await createUser('Super Admin 3', 'superadmin3@gmail.com', 'superadmin3', 'superadmin'),
        await createUser('Super Admin 4', 'superadmin4@gmail.com', 'superadmin4', 'superadmin'),
        await createUser('Super Admin 5', 'superadmin5@gmail.com', 'superadmin5', 'superadmin'),
        await createUser('Admin 1', 'admin1@gmail.com', 'admin1password', 'admin'),
        await createUser('Admin 2', 'admin2@gmail.com', 'admin2password', 'admin'),
        await createUser('Admin 3', 'admin3@gmail.com', 'admin3password', 'admin'),
        await createUser('Admin 4', 'admin4@gmail.com', 'admin4password', 'admin'),
        await createUser('Admin 5', 'admin5@gmail.com', 'admin5password', 'admin'),
        await createUser('Admin 6', 'admin6@gmail.com', 'admin6password', 'admin'),
        await createUser('Admin 7', 'admin7@gmail.com', 'admin7password', 'admin'),
        await createUser('Member 1', 'member1@gmail.com', 'member1password', 'member'),
        await createUser('Member 2', 'member2@gmail.com', 'member2password', 'member'),
        await createUser('Member 3', 'member3@gmail.com', 'member3password', 'member'),
        await createUser('Member 4', 'member4@gmail.com', 'member4password', 'member'),
        await createUser('Member 5', 'member5@gmail.com', 'member5password', 'member'),
        await createUser('Member 6', 'member6@gmail.com', 'member6password', 'member'),
        await createUser('Member 7', 'member7@gmail.com', 'member7password', 'member'),
        await createUser('Member 8', 'member8@gmail.com', 'member8password', 'member'),
        await createUser('Member 9', 'member9@gmail.com', 'member9password', 'member'),
        await createUser('Member 10', 'member10@gmail.com', 'member10password', 'member')
    ]

    // Inserts seed entries
    await knex("users").insert(users);
};
