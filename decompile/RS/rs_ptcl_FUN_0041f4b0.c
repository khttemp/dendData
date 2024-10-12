
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void __fastcall FUN_0041f4b0(undefined4 param_1,undefined4 param_2)

{
  undefined4 *puVar1;
  float *pfVar2;
  int iVar3;
  int in_EAX;
  undefined4 extraout_ECX;
  undefined4 extraout_ECX_00;
  undefined4 extraout_ECX_01;
  undefined4 extraout_ECX_02;
  undefined4 uVar4;
  undefined4 extraout_EDX;
  undefined4 extraout_EDX_00;
  undefined4 extraout_EDX_01;
  undefined4 extraout_EDX_02;
  undefined4 extraout_EDX_03;
  undefined4 uVar5;
  undefined4 extraout_EDX_04;
  uint *unaff_EDI;
  byte bVar6;
  float10 fVar7;
  ulonglong uVar8;
  float fVar9;
  float fVar10;
  float fVar11;
  undefined4 in_stack_ffffffd4;
  undefined4 uVar12;
  float fVar13;
  undefined4 in_stack_ffffffd8;
  undefined4 in_stack_ffffffdc;
  Vector3D local_c [12];
  
  if (*(int *)(unaff_EDI[0x27] + 8) == 0) {
    return;
  }
  switch(*(undefined2 *)(in_EAX + 2)) {
  case 0x151:
    fVar9 = (float)(*(undefined4 **)(in_EAX + 4))[2];
    uVar5 = **(undefined4 **)(in_EAX + 4);
    FUN_004bb3f0(param_1,param_2);
    FUN_00401350(unaff_EDI + 3,uVar5,fVar9);
    return;
  case 0x152:
    puVar1 = *(undefined4 **)(in_EAX + 4);
    fVar9 = (float)puVar1[4];
    uVar5 = puVar1[2];
    uVar4 = puVar1[1];
    uVar12 = *puVar1;
    uVar8 = FUN_004bb3f0(param_1,param_2);
    FUN_0041ecd0(unaff_EDI + 10,(int)uVar8,uVar12,uVar4,uVar5,fVar9);
    return;
  case 0x153:
    fVar9 = (float)(*(undefined4 **)(in_EAX + 4))[2];
    uVar5 = **(undefined4 **)(in_EAX + 4);
    FUN_004bb3f0(param_1,param_2);
    FUN_0041ed70(unaff_EDI + 10,uVar5,fVar9);
    return;
  case 0x154:
    uVar8 = FUN_004bb3f0(*(undefined4 *)(in_EAX + 4),param_2);
    unaff_EDI[0x26] = (uint)uVar8;
    return;
  case 0x155:
    fVar9 = (float)(*(undefined4 **)(in_EAX + 4))[2];
    uVar5 = **(undefined4 **)(in_EAX + 4);
    FUN_004bb3f0(param_1,param_2);
    FUN_00401350(unaff_EDI + 0x52,uVar5,fVar9);
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    bVar6 = (byte)((ushort)((ushort)NAN(fVar9) << 10) >> 8) |
            (byte)((ushort)((ushort)(fVar9 == 0.0) << 0xe) >> 8);
    break;
  case 0x156:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 8);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) + *(float *)(iVar3 + 8);
    }
    (**(code **)(DAT_004ca580 + 0x18))();
    uVar5 = *(undefined4 *)(*(int *)(in_EAX + 4) + 0xc);
    uVar4 = *(undefined4 *)(*(int *)(in_EAX + 4) + 8);
    (**(code **)(DAT_004ca580 + 0x18))();
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))
                               (*(undefined4 *)(*(int *)(in_EAX + 4) + 0x14),
                                *(undefined4 *)(*(int *)(in_EAX + 4) + 0x18));
    fVar9 = (float)fVar7;
    FUN_004bb3f0(extraout_ECX,extraout_EDX);
    FUN_0040fa30(unaff_EDI + 0x52,uVar5,uVar4,fVar9);
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0x1c);
    bVar6 = (byte)((ushort)((ushort)NAN(fVar9) << 10) >> 8) |
            (byte)((ushort)((ushort)(fVar9 == 0.0) << 0xe) >> 8);
    break;
  case 0x157:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 8);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) + *(float *)(iVar3 + 8);
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0x10);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0x14);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x14) - *(float *)(iVar3 + 0x10);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x14) = *(float *)(iVar3 + 0x14) - *(float *)(iVar3 + 0x10);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x14) + *(float *)(iVar3 + 0x10);
    }
    (**(code **)(DAT_004ca580 + 0x18))();
    uVar5 = *(undefined4 *)(*(int *)(in_EAX + 4) + 8);
    (**(code **)(DAT_004ca580 + 0x18))();
    uVar4 = *(undefined4 *)(*(int *)(in_EAX + 4) + 0x14);
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))
                               (*(undefined4 *)(*(int *)(in_EAX + 4) + 0x10));
    fVar9 = (float)fVar7;
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0x1c);
    uVar8 = FUN_004bb3f0(extraout_ECX_00,extraout_EDX_00);
    FUN_0041ecd0(unaff_EDI + 10,(int)uVar8,uVar4,uVar5,fVar9,fVar10);
    return;
  case 0x158:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0x10);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0x10) - *(float *)(iVar3 + 0xc);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x10) - *(float *)(iVar3 + 0xc);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0x10) + *(float *)(iVar3 + 0xc);
    }
    uVar5 = **(undefined4 **)(in_EAX + 4);
    (**(code **)(DAT_004ca580 + 0x18))();
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))();
    fVar9 = (float)fVar7;
    FUN_004bb3f0(*(undefined4 *)(in_EAX + 4),extraout_EDX_01);
    FUN_0041ed70(unaff_EDI + 10,uVar5,fVar9);
    return;
  case 0x159:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0x10);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0x10) - *(float *)(iVar3 + 0xc);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x10) - *(float *)(iVar3 + 0xc);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0x10) + *(float *)(iVar3 + 0xc);
    }
    uVar5 = **(undefined4 **)(in_EAX + 4);
    (**(code **)(DAT_004ca580 + 0x18))();
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))();
    fVar9 = (float)fVar7;
    FUN_004bb3f0(*(undefined4 *)(in_EAX + 4),extraout_EDX_02);
    FUN_00401350(unaff_EDI + 3,uVar5,fVar9);
    return;
  default:
    MessageBoxA((HWND)0x0,&DAT_004bf468,"ERROR",0x10);
    printf(&DAT_004bf468);
    printf("ASSERT : %4d, %s\n");
    _DAT_00000001 = 0xbadc0de;
    return;
  case 0x15b:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))();
    fVar9 = (float)fVar7;
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    fVar11 = fVar9;
    fVar13 = fVar9;
    uVar8 = FUN_004bb3f0(extraout_ECX_01,extraout_EDX_03);
    FUN_0041ecd0(unaff_EDI + 10,(int)uVar8,fVar9,fVar11,fVar13,fVar10);
    return;
  case 0x15c:
    if ((NAN(**(float **)(in_EAX + 4)) || NAN((float)unaff_EDI[0x24])) ==
        (**(float **)(in_EAX + 4) == (float)unaff_EDI[0x24])) {
      return;
    }
    *(undefined2 *)(unaff_EDI + 1) = 0xffff;
    *(undefined2 *)((int)unaff_EDI + 6) = 0xffff;
    *unaff_EDI = *unaff_EDI & 0xfffffffc;
    return;
  case 0x15d:
    pfVar2 = *(float **)(in_EAX + 4);
    fVar9 = pfVar2[4];
    Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xffffffd4,*pfVar2,pfVar2[1],pfVar2[2]);
    uVar5 = *(undefined4 *)(in_EAX + 4);
    uVar4 = extraout_ECX_02;
    goto LAB_0041fac7;
  case 0x15e:
    fVar9 = **(float **)(in_EAX + 4);
    fVar10 = (*(float **)(in_EAX + 4))[1];
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      pfVar2[1] = pfVar2[1] - *pfVar2;
      pfVar2 = *(float **)(in_EAX + 4);
      *pfVar2 = pfVar2[1] + *pfVar2;
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 8);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0xc);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0xc) = *(float *)(iVar3 + 0xc) - *(float *)(iVar3 + 8);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 8) = *(float *)(iVar3 + 0xc) + *(float *)(iVar3 + 8);
    }
    fVar9 = *(float *)(*(int *)(in_EAX + 4) + 0x10);
    fVar10 = *(float *)(*(int *)(in_EAX + 4) + 0x14);
    if (fVar10 < fVar9 != (NAN(fVar10) || NAN(fVar9))) {
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x14) - *(float *)(iVar3 + 0x10);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x14) = *(float *)(iVar3 + 0x14) - *(float *)(iVar3 + 0x10);
      iVar3 = *(int *)(in_EAX + 4);
      *(float *)(iVar3 + 0x10) = *(float *)(iVar3 + 0x14) + *(float *)(iVar3 + 0x10);
    }
    Selene::Math::Vector3D::Vector3D(local_c);
    in_stack_ffffffdc = **(undefined4 **)(in_EAX + 4);
    (**(code **)(DAT_004ca580 + 0x18))();
    in_stack_ffffffd8 = *(undefined4 *)(*(int *)(in_EAX + 4) + 0xc);
    in_stack_ffffffd4 = *(undefined4 *)(*(int *)(in_EAX + 4) + 8);
    (**(code **)(DAT_004ca580 + 0x18))();
    (**(code **)(DAT_004ca580 + 0x18))
              (*(undefined4 *)(*(int *)(in_EAX + 4) + 0x10),
               *(undefined4 *)(*(int *)(in_EAX + 4) + 0x14));
    fVar7 = (float10)(**(code **)(DAT_004ca580 + 0x18))
                               (*(undefined4 *)(*(int *)(in_EAX + 4) + 0x1c),
                                *(undefined4 *)(*(int *)(in_EAX + 4) + 0x20));
    fVar9 = (float)fVar7;
    Selene::Math::Vector3D::Vector3D((Vector3D *)&stack0xffffffd4,local_c);
    uVar4 = *(undefined4 *)(in_EAX + 4);
    uVar5 = extraout_EDX_04;
LAB_0041fac7:
    uVar8 = FUN_004bb3f0(uVar4,uVar5);
    FUN_0041ecd0(unaff_EDI + 0x3d,(int)uVar8,in_stack_ffffffd4,in_stack_ffffffd8,in_stack_ffffffdc,
                 fVar9);
    return;
  }
  if ((POPCOUNT(bVar6) & 1U) != 0) {
    unaff_EDI[0x58] = unaff_EDI[0x58] & 0xfffffffe;
    return;
  }
  unaff_EDI[0x58] = unaff_EDI[0x58] | 1;
  return;
}

