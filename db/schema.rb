# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_12_12_023723) do

  create_table "chats", force: :cascade do |t|
    t.text "content"
    t.integer "user_id"
    t.integer "task_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_chats_on_task_id"
    t.index ["user_id"], name: "index_chats_on_user_id"
  end

  create_table "task_users", force: :cascade do |t|
    t.integer "task_id", null: false
    t.integer "user_id", null: false
    t.text "user_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "task_type", null: false
    t.index ["task_id"], name: "index_task_users_on_task_id"
    t.index ["user_id"], name: "index_task_users_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.text "name"
    t.text "overview"
    t.text "user_ids"
    t.integer "user_id"
    t.text "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "parent_task_id"
    t.index ["parent_task_id"], name: "index_tasks_on_parent_task_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "name"
    t.text "rep"
    t.text "user_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "company"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "task_users", "tasks"
  add_foreign_key "task_users", "users"
  add_foreign_key "tasks", "tasks", column: "parent_task_id"
end
