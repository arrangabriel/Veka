from django.http import HttpResponse

def index(request):
    return HttpResponse("Her kommer applikasjonen vår!:)")
