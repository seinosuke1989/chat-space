require 'rails_helper'

feature 'tweet', type: :feature do
# このブロックの内部にscenarioを記述していく
let(:user) { create(:user) }

  scenario 'post tweet' do
    # ログイン前には投稿ボタンがない
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    visit root_p
    expect(page).to have_no_content('投稿する')
  end
end