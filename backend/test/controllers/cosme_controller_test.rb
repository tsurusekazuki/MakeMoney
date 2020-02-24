require 'test_helper'

class CosmeControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get cosme_show_url
    assert_response :success
  end

end
