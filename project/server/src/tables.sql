CREATE TABLE entries (
    uId BIGSERIAL PRIMARY KEY,
    word VARCHAR(25) NOT NULL,
    wordtype VARCHAR(20) NOT NULL,
    definition TEXT NOT NULL
);

CREATE INDEX idx_word ON entries (LOWER(word));

CREATE TABLE exampleentries (
    uId BIGSERIAL PRIMARY KEY,
    word VARCHAR(25) NOT NULL,
    example TEXT NOT NULL
);

CREATE INDEX idx_exampleentries_word ON exampleentries (LOWER(word));

CREATE TABLE recententries (
    uId BIGSERIAL PRIMARY KEY,
    word VARCHAR(25) NOT NULL,
    count BIGINT NOT NULL
);

CREATE INDEX idx_recententries_word ON recententries (LOWER(word));
CREATE INDEX idx_recententries_count_desc ON recententries (count DESC);
