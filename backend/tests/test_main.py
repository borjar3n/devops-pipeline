Run cd backend
============================= test session starts ==============================
platform linux -- Python 3.11.11, pytest-8.3.4, pluggy-1.5.0
rootdir: /home/runner/work/devops-pipeline/devops-pipeline/backend
plugins: cov-6.0.0, anyio-4.8.0
collected 2 items

tests/test_main.py F.                                                    [100%]

=================================== FAILURES ===================================
________________________________ test_read_root ________________________________

    def test_read_root():
        response = client.get("/")
        assert response.status_code == 200
>       assert response.json() == {"message": "Welcome to the Inventory API"}
E       AssertionError: assert {'message': '...ventory API.'} == {'message': '...nventory API'}
E         
E         Differing items:
E         {'message': 'Welcome to the Inventory API.'} != {'message': 'Welcome to the Inventory API'}
E         
E         Full diff:
E           {
E         -     'message': 'Welcome to the Inventory API',
E         +     'message': 'Welcome to the Inventory API.',
E         ?                                             +
E           }

tests/test_main.py:9: AssertionError
=============================== warnings summary ===============================
../../../../../../opt/hostedtoolcache/Python/3.11.11/x64/lib/python3.11/site-packages/pydantic/_internal/_config.py:295
../../../../../../opt/hostedtoolcache/Python/3.11.11/x64/lib/python3.11/site-packages/pydantic/_internal/_config.py:295
  /opt/hostedtoolcache/Python/3.11.11/x64/lib/python3.11/site-packages/pydantic/_internal/_config.py:295: PydanticDeprecatedSince20: Support for class-based `config` is deprecated, use ConfigDict instead. Deprecated in Pydantic V2.0 to be removed in V3.0. See Pydantic V2 Migration Guide at https://errors.pydantic.dev/2.10/migration/
    warnings.warn(DEPRECATION_MESSAGE, DeprecationWarning)

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html

---------- coverage: platform linux, python 3.11.11-final-0 ----------
Coverage XML written to file coverage.xml

=========================== short test summary info ============================
FAILED tests/test_main.py::test_read_root - AssertionError: assert {'message': '...ventory API.'} == {'message': '...nventory API'}
  
  Differing items:
  {'message': 'Welcome to the Inventory API.'} != {'message': 'Welcome to the Inventory API'}
  
  Full diff:
    {
  -     'message': 'Welcome to the Inventory API',
  +     'message': 'Welcome to the Inventory API.',
  ?                                             +
    }
=================== 1 failed, 1 passed, 2 warnings in 1.50s ====================
Error: Process completed with exit code 1.
