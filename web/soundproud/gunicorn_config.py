import multiprocessing


def workers_count():
    return multiprocessing.cpu_count() * 2 + 1


workers = workers_count()
