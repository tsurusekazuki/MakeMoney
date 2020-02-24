require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  test "should get get_tag" do
    get tags_get_tag_url
    assert_response :success
  end

end
