-- Insert admin user (password: "password")
INSERT INTO users (email, password, full_name, role, created_at, updated_at) VALUES
('admin@deegee.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Admin User', 'admin', NOW(), NOW());

-- Insert 10 regular users (password: "password")
INSERT INTO users (email, password, full_name, role, created_at, updated_at) VALUES
('user1@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'John Doe', 'user', NOW(), NOW()),
('user2@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Jane Smith', 'user', NOW(), NOW()),
('user3@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Michael Brown', 'user', NOW(), NOW()),
('user4@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Sarah Wilson', 'user', NOW(), NOW()),
('user5@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'David Lee', 'user', NOW(), NOW()),
('user6@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Emma Taylor', 'user', NOW(), NOW()),
('user7@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Robert Martinez', 'user', NOW(), NOW()),
('user8@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Lisa Anderson', 'user', NOW(), NOW()),
('user9@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'James Garcia', 'user', NOW(), NOW()),
('user10@example.com', '$2b$10$YIvxNzHd8/wL8L5dT0U4WOvjkEk5gJLn9KVZi7y4K5.Q3K5K5K5K5', 'Patricia Thomas', 'user', NOW(), NOW());
