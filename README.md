# http-splitter
Split request for a server into two webservers listens

# Purpose
The purpose of this program is to set up a reverse proxy in front of a production webservice. 
All requests going to this webservice host must be requested against a secondary server (presumably a test environment)
 to mirror all calls into the test environment thus making development on a real datastructure way easier.
 
This is a work in progress - things like messagequeueing the test request for performance reasons are not build in yet. 

