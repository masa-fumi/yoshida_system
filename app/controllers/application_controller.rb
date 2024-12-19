class ApplicationController < ActionController::Base
    layout 'application'
    @messages = Chat.all
end
