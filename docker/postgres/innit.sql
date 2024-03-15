CREATE TABLE Users (
                       id UUID PRIMARY KEY,
                       username VARCHAR NOT NULL,
                       email VARCHAR NOT NULL,
                       password VARCHAR NOT NULL,
                       role VARCHAR NOT NULL,
                       lastLogin TIMESTAMP,
                       salt VARCHAR NOT NULL,
                       resetPasswordToken VARCHAR,
                       resetPasswordExpires TIMESTAMP
);

CREATE TABLE ToDos (
                       id UUID PRIMARY KEY,
                       user_id UUID NOT NULL,
                       title VARCHAR NOT NULL,
                       description TEXT,
                       done BOOLEAN NOT NULL,
                       createdAt TIMESTAMP,
                       updatedAt TIMESTAMP,
                       deletedAt TIMESTAMP
);
