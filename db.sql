CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE',

    last_login DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE roles (
    id CHAR(36) PRIMARY KEY,

    name VARCHAR(80) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE permissions (

    id CHAR(36) PRIMARY KEY,

    module VARCHAR(80),

    action VARCHAR(80),

    code VARCHAR(120) UNIQUE
);
CREATE TABLE role_permissions (

    role_id CHAR(36),

    permission_id CHAR(36),

    PRIMARY KEY (
        role_id,
        permission_id
    ),

    FOREIGN KEY(role_id)
        REFERENCES roles(id),

    FOREIGN KEY(permission_id)
        REFERENCES permissions(id)
);
CREATE TABLE user_roles (

    user_id CHAR(36),

    role_id CHAR(36),

    PRIMARY KEY (
        user_id,
        role_id
    ),

    FOREIGN KEY(user_id)
        REFERENCES users(id),

    FOREIGN KEY(role_id)
        REFERENCES roles(id)
);
CREATE TABLE patients (

    id CHAR(36) PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    mobile VARCHAR(20) NOT NULL,

    whatsapp_number VARCHAR(20),

    email VARCHAR(150),

    gender ENUM(
        'Male',
        'Female',
        'Other'
    ),

    dob DATE,

    age INT,

    address TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE patient_visits (

    id CHAR(36) PRIMARY KEY,

    patient_id CHAR(36),

    doctor_name VARCHAR(120),

    coordinator_name VARCHAR(120),

    visit_type ENUM(
        'NEW',
        'FOLLOW_UP'
    ),

    visit_date DATE,

    visit_time TIME,

    opd_location VARCHAR(120),

    feedback_status ENUM(
        'PENDING',
        'SENT',
        'RESPONDED'
    ) DEFAULT 'PENDING',

    FOREIGN KEY(patient_id)
        REFERENCES patients(id)
);
CREATE TABLE whatsapp_templates (

    id CHAR(36) PRIMARY KEY,

    name VARCHAR(100),

    meta_template_name VARCHAR(120),

    language VARCHAR(20),

    category VARCHAR(50),

    body TEXT,

    active BOOLEAN DEFAULT TRUE
);
CREATE TABLE automations (

    id CHAR(36) PRIMARY KEY,

    name VARCHAR(150),

    description TEXT,

    trigger_type VARCHAR(50),

    wait_hours INT,

    template_id CHAR(36),

    status ENUM(
        'ACTIVE',
        'PAUSED'
    ) DEFAULT 'ACTIVE',

    FOREIGN KEY(template_id)
        REFERENCES whatsapp_templates(id)
);
CREATE TABLE automation_runs (

    id CHAR(36) PRIMARY KEY,

    automation_id CHAR(36),

    patient_visit_id CHAR(36),

    scheduled_at DATETIME,

    executed_at DATETIME,

    status ENUM(
        'PENDING',
        'RUNNING',
        'COMPLETED',
        'FAILED'
    ),

    error TEXT,

    FOREIGN KEY(automation_id)
        REFERENCES automations(id),

    FOREIGN KEY(patient_visit_id)
        REFERENCES patient_visits(id)
);
CREATE TABLE whatsapp_messages (

    id CHAR(36) PRIMARY KEY,

    patient_id CHAR(36),

    visit_id CHAR(36),

    template_id CHAR(36),

    meta_message_id VARCHAR(150),

    status VARCHAR(50),

    sent_at DATETIME,

    delivered_at DATETIME,

    read_at DATETIME,

    failed_reason TEXT,

    FOREIGN KEY(patient_id)
        REFERENCES patients(id),

    FOREIGN KEY(visit_id)
        REFERENCES patient_visits(id),

    FOREIGN KEY(template_id)
        REFERENCES whatsapp_templates(id)
);
CREATE TABLE feedback_requests (

    id CHAR(36) PRIMARY KEY,

    patient_id CHAR(36),

    visit_id CHAR(36),

    automation_run_id CHAR(36),

    rating INT,

    feedback TEXT,

    google_review_clicked BOOLEAN,

    google_review_posted BOOLEAN,

    submitted_at DATETIME,

    FOREIGN KEY(patient_id)
        REFERENCES patients(id),

    FOREIGN KEY(visit_id)
        REFERENCES patient_visits(id),

    FOREIGN KEY(automation_run_id)
        REFERENCES automation_runs(id)
);
CREATE TABLE import_jobs (

    id CHAR(36) PRIMARY KEY,

    filename VARCHAR(255),

    total_rows INT,

    success_rows INT,

    failed_rows INT,

    status VARCHAR(30),

    uploaded_by CHAR(36),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE audit_logs (

    id CHAR(36) PRIMARY KEY,

    user_id CHAR(36),

    action VARCHAR(100),

    entity VARCHAR(100),

    entity_id CHAR(36),

    old_data JSON,

    new_data JSON,

    ip VARCHAR(60),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);